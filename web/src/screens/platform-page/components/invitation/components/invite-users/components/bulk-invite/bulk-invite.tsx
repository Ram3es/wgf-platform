import axios from 'axios';
import Papa from 'papaparse';
import React, { FC, useCallback, useEffect, useState } from 'react';
import { trackPromise } from 'react-promise-tracker';
import { v4 as uuidv4 } from 'uuid';

import { Button } from '@components/button';
import { DropBox } from '@components/drop-box';
import { Icon } from '@components/icon';
import { COLORS } from '@styles/colors';

import { useAppSelector } from '@services/hooks/redux';
import { getGroupsByTrainer } from '@services/trainer.service';

import { errorMessage, fileError } from '@constants/pop-up-messages';
import { PROMISES_AREA } from '@constants/promises-area';
import { STRINGS } from '@constants/strings';
import { ROLES } from '@constants/user-roles';

import { BulkInviteStyled as Styled } from './bulk-invite.styles';

interface IBulkInviteData {
  name: string;
  email: string;
  id: string;
  group?: string;
}

const keys = ['name', 'email'];

export const BulkInvite: FC = () => {
  const [file, setFile] = useState<null | {
    name: string;
    csv: string | null;
  }>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isFileUploading, setIsFileUploading] = useState<boolean>(false);
  const [csvFileData, setCsvFileData] = useState<IBulkInviteData[] | null>(
    null
  );
  const { user } = useAppSelector((state) => state);

  const [groups, setGroups] = useState<IGroup[] | []>([]);

  const getGroups = useCallback(async () => {
    try {
      const { data } = await trackPromise(
        getGroupsByTrainer({ trainerId: user.id }),
        PROMISES_AREA.getGroupsByTrainer
      );

      setGroups(data);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return errorMessage(error?.response?.data.message).fire();
      }
    }
  }, []);

  useEffect(() => {
    if (user.role === ROLES.trainerAdmin) {
      getGroups();
    }
  }, [getGroups, user.role]);

  const onHandleFiles = (files: File[]) => {
    try {
      setIsLoading(true);
      const reader = new FileReader();
      reader.readAsText(files[0]);

      reader.onloadend = () => {
        const csv = reader.result?.toString() || null;

        setFile((prev) => ({ ...prev!, name: files[0].name, csv }));

        setIsLoading(false);
      };
    } catch {
      fileError.format.fire();
      setIsLoading(false);
    }
  };

  const cancelUpload = () => {
    setIsFileUploading(false);
    setFile(null);
  };

  const uploadFile = () => {
    setIsFileUploading(true);

    const results: Papa.ParseResult<IBulkInviteData> = Papa.parse(file!.csv!, {
      header: true,
      skipEmptyLines: 'greedy',
      transformHeader: (header) => header.toLowerCase(),
    });

    const data = results.data.filter((item) =>
      keys.every(
        (key) => item.hasOwnProperty(key) && item[key as keyof IBulkInviteData]
      )
    );

    if (!data.length) {
      setIsFileUploading(false);
      setFile(null);
      return fileError.data.fire();
    }

    const filteredUserList = data.map((item) => {
      let trainerGroup;

      if (user.role === ROLES.trainerAdmin) {
        trainerGroup =
          groups.find((group) => group.name === item.group)?.name ||
          'Unassigned';
      }

      return {
        ...item,
        id: uuidv4(),
        group: trainerGroup,
      };
    });

    setTimeout(() => {
      setCsvFileData(filteredUserList);
      setIsFileUploading(false);
    }, 3000);
  };

  if (csvFileData && file) {
    return (
      <Styled.Wrapper>
        <Styled.Title>{STRINGS.invitation.bulkInvite}</Styled.Title>
        <Styled.ContentWrapper>
          <Styled.Content></Styled.Content>
        </Styled.ContentWrapper>
      </Styled.Wrapper>
    );
  }

  if (file) {
    return (
      <Styled.Wrapper>
        <Styled.Title>{STRINGS.invitation.bulkInvite}</Styled.Title>
        <Styled.ContentWrapper>
          <Styled.Content>
            <Styled.FileName>
              <Icon type="file" />
              <span>{file.name}</span>
            </Styled.FileName>
            {isFileUploading ? (
              <>
                <Styled.Progress />
                <Button
                  onClick={cancelUpload}
                  title={STRINGS.button.cancel}
                  minWidth={165}
                  variant="cancel"
                />
              </>
            ) : (
              <>
                <Styled.FileSuccess>
                  <Icon type="selected" />
                  <span>File uploaded successfully</span>
                </Styled.FileSuccess>
                <Button
                  onClick={uploadFile}
                  title={STRINGS.button.uploadFile}
                  color={COLORS.liteBlue}
                  minWidth={165}
                />
              </>
            )}
          </Styled.Content>
        </Styled.ContentWrapper>
      </Styled.Wrapper>
    );
  }

  return (
    <Styled.Wrapper>
      <Styled.Title>{STRINGS.invitation.bulkInvite}</Styled.Title>
      <Styled.ContentWrapper>
        <DropBox
          onHandleFile={onHandleFiles}
          isFileLoading={isLoading}
          acceptFiles=".csv, text/csv"
        />
      </Styled.ContentWrapper>
    </Styled.Wrapper>
  );
};
