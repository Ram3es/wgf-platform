import Papa from 'papaparse';
import React, { FC, useState } from 'react';

import { Button } from '@components/button';
import { DropBox } from '@components/drop-box';
import { Icon } from '@components/icon';
import { COLORS } from '@styles/colors';

import { fileError } from '@constants/pop-up-messages';
import { STRINGS } from '@constants/strings';

import { BulkInviteStyled as Styled } from './bulk-invite.styles';

interface IBulkInviteData {
  name: string;
  email: string;
  group: string;
}

const keys = ['name', 'email'];

export const BulkInvite: FC = () => {
  const [file, setFile] = useState<null | {
    name: string;
    csv: string | null;
  }>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isFileUploading, setIsFileUploading] = useState<boolean>(false);
  const [userList, setUserList] = useState<IBulkInviteData[] | null>(null);

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

    const filteredUserList = data.map((item) => ({
      ...item,
      group: item.group || 'Unassigned',
    }));

    setTimeout(() => {
      setUserList(filteredUserList);
      setIsFileUploading(false);
    }, 3000);
  };

  return (
    <Styled.Wrapper>
      <Styled.Title>{STRINGS.invitation.bulkInvite}</Styled.Title>
      {file ? (
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
                color={COLORS.blue}
                minWidth={165}
              />
            </>
          )}
        </Styled.Content>
      ) : (
        <DropBox
          onHandleFile={onHandleFiles}
          isFileLoading={isLoading}
          acceptFiles=".csv, text/csv"
        />
      )}
    </Styled.Wrapper>
  );
};
