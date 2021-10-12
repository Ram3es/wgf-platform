import axios from 'axios';
import { ChangeEvent, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import { useUpdateState } from '@services/hooks/useUpdateState';
import { storageService } from '@services/storage/storage';
import { updateProfilePassword, updateUser } from '@services/user.service';

import { DATE_OPTIONS } from '@constants/date';
import { errorMessage } from '@constants/pop-up-messages';
import { Toast } from '@constants/toasts';
import { initialAccountData, initialProfileState } from './profile.constants';

import { IProfileInitialState } from './profile.typings';

export const useProfileState = () => {
  const { replace } = useHistory();

  const { state, updateState } =
    useUpdateState<IProfileInitialState>(initialProfileState);

  useEffect(() => {
    const user = storageService.getUser();

    if (!user) {
      return replace('/');
    }

    const created = new Date(user.created).toLocaleString(
      'en-US',
      DATE_OPTIONS
    );

    const data = {
      created,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      occupation: user.occupation,
      organizationName: user.organizationName,
      mobileNumber: user.mobileNumber,
      country: user.country,
    };

    updateState({
      user,
      profileData: data,
      initialProfileData: data,
    });
  }, []);

  const handleImageChange = (value: string) => {
    if (value !== state.user?.avatar) {
      updateState((prev) => ({
        user: { ...prev.user!, avatar: value },
        isPhotoPicked: true,
      }));
    }
  };

  const updateUserApi = async () => {
    try {
      const { data } = await updateUser({
        ...state.user!,
        ...state.profileData!,
        created: state.user!.created,
      });

      storageService.setUser(data);

      Toast.fire({
        icon: 'success',
        title: 'Profile updated successfully',
      });
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return errorMessage(error?.response?.data.message).fire();
      }
    }
  };

  const profileChange = (event: ChangeEvent<HTMLInputElement>) => {
    updateState((prev) => ({
      profileData: {
        ...prev.profileData!,
        [event.target.name]:
          event.target.name === 'email'
            ? event.target.value.trim()
            : event.target.value,
      },
    }));
  };

  const accountChange = (event: ChangeEvent<HTMLInputElement>) => {
    updateState((prev) => ({
      accountData: {
        ...prev.accountData,
        [event.target.name]: event.target.value,
      },
    }));
  };

  const sendAvatar = async () => {
    await updateUserApi();
    updateState({ isPhotoPicked: false });
  };

  const editProfileClick = () => {
    cancelEditAccount();
    updateState({ isProfileEdit: true });
  };

  const editAccountClick = () => {
    cancelEditProfile();
    updateState({ isAccountEdit: true });
  };

  const cancelEditProfile = () => {
    const data = {
      created: state.user!.created,
      email: state.user!.email,
      firstName: state.user!.firstName,
      lastName: state.user!.lastName,
      occupation: state.user!.occupation,
      organizationName: state.user!.organizationName,
      mobileNumber: state.user!.mobileNumber,
      country: state.user!.country,
    };

    updateState({ isProfileEdit: false, profileData: data });
  };

  const cancelEditAccount = () => {
    updateState({ isAccountEdit: false, accountData: initialAccountData });
  };

  const handleSubmitProfileForm = async () => {
    updateState((prev) => ({
      user: {
        ...prev.user!,
        ...state.profileData,
      },
      initialProfileData: state.profileData,
      isProfileEdit: false,
    }));

    await updateUserApi();
  };

  const updateSelectedCountry = (selected: string) => {
    updateState((prev) => ({
      profileData: {
        ...prev.profileData!,
        country: selected,
      },
    }));
  };

  const handleSubmitAccountForm = async () => {
    try {
      updateState({ isAccountEdit: false });
      await updateProfilePassword({
        password: state.accountData.password,
        newPassword: state.accountData.newPassword,
      });

      Toast.fire({
        icon: 'success',
        title: 'Password changed successfully',
      });
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return errorMessage(error?.response?.data.message).fire();
      }
    }
  };

  return {
    ...state,
    handleImageChange,
    updateUserApi,
    profileChange,
    sendAvatar,
    updateState,
    editProfileClick,
    cancelEditProfile,
    handleSubmitProfileForm,
    accountChange,
    cancelEditAccount,
    editAccountClick,
    handleSubmitAccountForm,
    updateSelectedCountry,
  };
};
