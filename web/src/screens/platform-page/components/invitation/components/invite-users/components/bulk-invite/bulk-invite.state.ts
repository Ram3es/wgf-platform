import axios from 'axios';
import Papa from 'papaparse';
import { useCallback, useEffect, useState } from 'react';
import { trackPromise } from 'react-promise-tracker';
import { v4 as uuidv4 } from 'uuid';

import { useAppSelector } from '@services/hooks/redux';
import { inviteTrainer, inviteUser } from '@services/super-admin.service';
import { getGroupsByTrainer, inviteStudent } from '@services/trainer.service';

import { errorMessage, fileError } from '@constants/pop-up-messages';
import { PROMISES_AREA } from '@constants/promises-area';
import { ROLES } from '@constants/user-roles';
import { requiredCsvKeys, typeOfInvitationForSuperAdmin } from './bulk-invite.constants';

import { IBulkInviteData } from './bulk-invite.typings';

export const useBulkInviteState = () => {
  const [file, setFile] = useState<null | {
    name: string;
    csv: string | null;
  }>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isFileUploading, setIsFileUploading] = useState<boolean>(false);
  const [inviteCsvData, setInviteCsvData] = useState<IBulkInviteData[] | null>(
    null
  );
  const { user } = useAppSelector((state) => state);

  const [groups, setGroups] = useState<IGroup[] | []>([]);
  const [isShownResultInvite, setIsShownResultInvite] = useState(false);

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
      setInviteCsvData(null);
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
      transformHeader: (header) =>
        header === 'typeOfInvitation' ? header : header.toLowerCase(),
    });

    const data = results.data.filter((item) =>
      requiredCsvKeys.every(
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
      let typeOfInvitation = 'student' as TInvitationType;

      if (user.role === ROLES.trainerAdmin) {
        trainerGroup =
          groups.find((group) => group.name === item.group)?.name ||
          'Unassigned';
      }

      if (user.role === 'superAdmin') {
        typeOfInvitation = (typeOfInvitationForSuperAdmin.find(
          (elem) => elem === item.typeOfInvitation?.toLowerCase()
        ) || 'user') as TInvitationType;
      }

      return {
        ...item,
        id: uuidv4(),
        typeOfInvitation,
        group: trainerGroup,
      };
    });

    setTimeout(() => {
      setInviteCsvData(filteredUserList);
      setIsFileUploading(false);
    }, 3000);
  };

  const handleResultTableClose = () => {
    setIsShownResultInvite(false);
    setInviteCsvData(null);
    setFile(null);
  };

  const onSubmitInvite = async () => {
    if (user.role === ROLES.superAdmin) {
      await trackPromise(inviteFromSuperAdmin(), PROMISES_AREA.bulkInvite);
      return setIsShownResultInvite(true);
    }

    await trackPromise(inviteStudents(), PROMISES_AREA.bulkInvite);
    setIsShownResultInvite(true);
  };

  const inviteFromSuperAdmin = async () => {
    if (!inviteCsvData) {
      return;
    }

    const usersData = inviteCsvData
      .filter((user) => user.isSelected)
      .map((user) => ({
        ...user,
        email: user.email.trim(),
        name: user.name.trim(),
      }));
    setInviteCsvData(usersData);

    for (let i = 0; i < usersData?.length; i++) {
      try {
        if (usersData[i].typeOfInvitation === 'trainer') {
          await inviteTrainer({
            to: usersData[i].email,
            type: 'trainer',
            name: usersData[i].name,
          });
        }

        if (usersData[i].typeOfInvitation === 'user') {
          await inviteUser({
            to: usersData[i].email,
            type: 'user',
            name: usersData[i].name,
          });
        }
      } catch (error) {
        if (axios.isAxiosError(error)) {
          const message = error.response?.data.message;
          setInviteCsvData((prev) =>
            prev!.map((item) =>
              item.id === usersData[i].id
                ? { ...usersData[i], error: message }
                : item
            )
          );
        }
      }
    }
  };

  const inviteStudents = async () => {
    if (!inviteCsvData) {
      return;
    }

    const usersData = inviteCsvData
      .filter((user) => user.isSelected)
      .map((user) => ({
        ...user,
        email: user.email.trim(),
        name: user.name.trim(),
      }));

    setInviteCsvData(usersData);

    for (let i = 0; i < usersData?.length; i++) {
      try {
        const groupId =
          groups.find((elem) => elem?.name === usersData[i].group)?.id || '';
        await inviteStudent({
          to: usersData[i].email,
          type: 'student',
          groupId,
          name: usersData[i].name,
        });
      } catch (error) {
        if (axios.isAxiosError(error)) {
          const message = error.response?.data.message;
          setInviteCsvData((prev) =>
            prev!.map((item) =>
              item.id === usersData[i].id
                ? { ...usersData[i], error: message }
                : item
            )
          );
        }
      }
    }
  };

  return {
    file,
    inviteCsvData,
    setInviteCsvData,
    isFileUploading,
    cancelUpload,
    uploadFile,
    onHandleFiles,
    isLoading,
    groups,
    isShownResultInvite,
    handleResultTableClose,
    onSubmitInvite,
    user,
  };
};
