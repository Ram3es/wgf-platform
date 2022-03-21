import axios from 'axios';
import { ChangeEvent, useEffect, useState } from 'react';
import { trackPromise } from 'react-promise-tracker';
import { useHistory } from 'react-router-dom';

import { updateUserAvatar, updateUserProfile } from '@store/reducers/user.slice';

import { useAppDispatch, useAppSelector } from '@services/hooks/redux';
import { useUpdateState } from '@services/hooks/useUpdateState';
import {
    getUserHasPassword, sendEmailVerification, updateProfilePassword, updateUser, verifyCode
} from '@services/user.service';

import { DATE_TIME_OPTIONS } from '@constants/date';
import { errorMessage, unAutorizedError } from '@constants/pop-up-messages';
import { PROMISES_AREA } from '@constants/promises-area';
import { ROUTES } from '@constants/routes';
import { Toast } from '@constants/toasts';
import { initialAccountData, initialProfileState } from './profile.constants';

import { IProfileInitialState } from './profile.typings';

export const useProfileState = () => {
  const { replace, push } = useHistory();

  const { user } = useAppSelector((state) => state);
  const { state, updateState } =
    useUpdateState<IProfileInitialState>(initialProfileState);
  const dispatch = useAppDispatch();
  const [showEmailCodeModal, setShowEmailCodeModal] = useState<boolean>(false);

  const [hasPassword, setHasPassword] = useState<{ password: boolean }>({
    password: false,
  });
  const [code, setCode] = useState<string>('');
  const [emailToChange, setEmailToChange] = useState<string>('');

  useEffect(() => {
    if (!user) {
      return replace('/');
    }
    userHasPassword();
    const created = new Date(user.created).toLocaleString(
      'en-US',
      DATE_TIME_OPTIONS
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

  const userHasPassword = async () => {
    const { data } = await trackPromise(
      getUserHasPassword(),
      PROMISES_AREA.getUserHasPassword
    );
    setHasPassword(data);
  };
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
        if (error.response?.status === 401) {
          return unAutorizedError()
            .fire()
            .finally(() => push('/sign-in'));
        }
        errorMessage(error?.response?.data.message).fire();
        return 'error';
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
    if (
      state.profileData?.email &&
      state.profileData?.email !== state.initialProfileData?.email
    ) {
      const newEmail = state.profileData?.email;
      sendEmailWithCode(newEmail);
      setEmailToChange(newEmail);
    } else {
      const data = await updateUserApi();
      if (data === 'error') {
        return;
      }

      updateState({
        initialProfileData: state.profileData,
        isProfileEdit: false,
      });

      dispatch(updateUserProfile(state.profileData!));
    }
  };

  const sendEmailWithCode = async (email: string) => {
    const userName = `${user.firstName} ${user.lastName}`;
    try {
      await trackPromise(
        sendEmailVerification({ email, userName }),
        PROMISES_AREA.sendEmailWithCode
      );
      setShowEmailCodeModal(true);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 401) {
          return unAutorizedError()
            .fire()
            .finally(() => push(ROUTES.signIn));
        }
        return errorMessage(error?.response?.data.message).fire();
      }
    }
  };

  const updateSelectedCountry = (selected: string) => {
    updateState((prev) => ({
      profileData: {
        ...prev.profileData!,
        country: selected,
      },
    }));
  };

  const handleSubmit = async () => {
    handleModalClose();
    try {
      const codeToSend = parseInt(code, 10);
      const newEmail = state.profileData?.email || '';
      await verifyCode({ codeToSend, newEmail });
      updateState({
        initialProfileData: state.profileData,
        isProfileEdit: false,
      });

      const payload = {
        ...user,
        ...state.profileData!,
      };
      dispatch(updateUserProfile(payload));
      Toast.fire({
        icon: 'success',
        title: 'Email changed successfully',
      });
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 401) {
          return unAutorizedError()
            .fire()
            .finally(() => push(ROUTES.signIn));
        }

        return errorMessage(error?.response?.data.message).fire();
      }
    } finally {
      setCode('');
    }
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
        if (error.response?.status === 401) {
          return unAutorizedError()
            .fire()
            .finally(() => push('/sign-in'));
        }

        return errorMessage(error?.response?.data.message).fire();
      }
    }
  };
  const handleModalClose = () => {
    setShowEmailCodeModal(false);
  };
  return {
    ...state,
    handleImageChange,
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
    code,
    setCode,
    handleSubmit,
    showEmailCodeModal,
    hasPassword,
    emailToChange,
    handleModalClose,
    sendEmailWithCode,
    setShowEmailCodeModal,
  };
};
