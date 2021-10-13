import axios from 'axios';
import { ChangeEvent, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { updateUserAvatar, updateUserProfile } from '@store/reducers/user.slice';
import { AppDispatch, RootState } from '@store/store';

import { useUpdateState } from '@services/hooks/useUpdateState';
import { updateProfilePassword, updateUser } from '@services/user.service';

import { DATE_OPTIONS } from '@constants/date';
import { errorMessage } from '@constants/pop-up-messages';
import { Toast } from '@constants/toasts';
import { initialAccountData, initialProfileState } from './profile.constants';

import { IProfileInitialState } from './profile.typings';

export const useProfileState = () => {
  const { replace } = useHistory();

  const { user } = useSelector((state: RootState) => state);

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
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
      profileData: data,
      initialProfileData: data,
      avatar: user.avatar,
    });
  }, []);

  const { state, updateState } =
    useUpdateState<IProfileInitialState>(initialProfileState);

  const handleImageChange = (value: string) => {
    if (value !== user?.avatar) {
      updateState({
        isPhotoPicked: true,
        avatar: value,
      });
    }
  };

  const updateUserApi = async (avatar?: string) => {
    try {
      const payload = {
        ...user,
        ...state.profileData!,
        created: user.created,
        avatar: avatar || user.avatar,
      };

      await updateUser(payload);

      dispatch(updateUserProfile(payload));

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
    await updateUserApi(state.avatar!);

    dispatch(updateUserAvatar({ avatar: state.avatar! }));

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
      created: user.created,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      occupation: user.occupation,
      organizationName: user.organizationName,
      mobileNumber: user.mobileNumber,
      country: user.country,
    };

    updateState({ isProfileEdit: false, profileData: data });
  };

  const cancelEditAccount = () => {
    updateState({ isAccountEdit: false, accountData: initialAccountData });
  };

  const handleSubmitProfileForm = async () => {
    updateState({
      initialProfileData: state.profileData,
      isProfileEdit: false,
    });

    dispatch(updateUserProfile(state.profileData!));

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
      updateState({ isAccountEdit: false, accountData: initialAccountData });
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
    user,
  };
};
