import axios from 'axios';
import { ChangeEvent, useCallback, useEffect, useState } from 'react';
import { trackPromise } from 'react-promise-tracker';

import { useAppSelector } from '@services/hooks/redux';
import { useUpdateState } from '@services/hooks/useUpdateState';
import { inviteTrainer, inviteUser } from '@services/super-admin.service';
import { getGroupsByTrainer, inviteStudent } from '@services/trainer.service';

import {
    errorMessage, studentInviteSuccessMessage, trainerInviteSuccessMessage, userInviteSuccessMessage
} from '@constants/pop-up-messages';
import { PROMISES_AREA } from '@constants/promises-area';
import { ROLES } from '@constants/user-roles';
import { initialIndividualInviteState } from './individual-invite.constants';

export const useIndividualInviteState = () => {
  const { state, updateState } = useUpdateState(initialIndividualInviteState);

  const { user } = useAppSelector((state) => state);

  const [isActiveDropdown, setIsActiveDropdown] = useState(false);

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

  const handleChangeInviteData = (event: ChangeEvent<HTMLInputElement>) => {
    updateState({ [event.target.name]: event.target.value });
  };

  const handleChangeAssignGroup = (value: string) => {
    updateState({ assignGroup: value });
  };

  const handleChangeGroupType = (value: string) => {
    updateState({ groupType: value });
  };

  const openDropdown = () => setIsActiveDropdown(true);

  const assignGroupsOptions = groups.map((item) => item.name);

  const handleSubmitInviteFromTrainer = async () => {
    try {
      const payload = {
        name: `${state.firstName} ${state.lastName}`,
        to: state.email,
        groupId:
          groups.find((item) => item.name === state.assignGroup)?.id || '',
        type: 'student',
      };
      await trackPromise(inviteStudent(payload), PROMISES_AREA.inviteStudent);

      studentInviteSuccessMessage.fire();
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return errorMessage(error?.response?.data.message).fire();
      }
    }
  };

  const handleSubmitInviteFromSuperAdmin = async () => {
    if (state.groupType === 'User') {
      return await handleInviteUser();
    }

    await handleInviteTrainer();
  };

  const handleInviteUser = async () => {
    try {
      const payload = {
        name: `${state.firstName} ${state.lastName}`,
        to: state.email,
        type: 'user',
      };
      await trackPromise(
        inviteUser(payload),
        PROMISES_AREA.inviteFromSuperAdmin
      );

      userInviteSuccessMessage.fire();
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return errorMessage(error?.response?.data.message).fire();
      }
    }
  };

  const handleInviteTrainer = async () => {
    try {
      const payload = {
        name: `${state.firstName} ${state.lastName}`,
        to: state.email,
        type: 'trainer',
      };
      await trackPromise(
        inviteTrainer(payload),
        PROMISES_AREA.inviteFromSuperAdmin
      );

      trainerInviteSuccessMessage.fire();
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return errorMessage(error?.response?.data.message).fire();
      }
    }
  };

  return {
    state,
    isActiveDropdown,
    assignGroupsOptions,
    user,
    handleChangeInviteData,
    handleChangeAssignGroup,
    handleChangeGroupType,
    openDropdown,
    setIsActiveDropdown,
    handleSubmitInviteFromTrainer,
    handleSubmitInviteFromSuperAdmin,
  };
};
