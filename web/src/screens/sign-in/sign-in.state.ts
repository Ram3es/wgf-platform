import axios from 'axios';
import { ChangeEvent, useEffect } from 'react';
import { trackPromise } from 'react-promise-tracker';
import { useHistory } from 'react-router-dom';

import { useUpdateState } from '@services/hooks/useUpdateState';
import { storageService } from '@services/storage/storage';
import { signIn } from '@services/user.service';

import { errorMessage, UserErrorMessages } from '@constants/pop-up-messages';
import { PROMISES_AREA } from '@constants/promises-area';
import { ROUTES } from '@constants/routes';
import { Toast } from '@constants/toasts';
import { initialSignInState } from './sign-in.constants';

import { ISignInState } from './sign-in.typings';

export const useSignInState = () => {
  const { replace, goBack, length, push } = useHistory();

  useEffect(() => {
    const user = storageService.getUser();
    const token = storageService.getToken();

    if (user && token) {
      return replace('/');
    }
  }, []);

  const { state, updateState } =
    useUpdateState<ISignInState>(initialSignInState);

  const checkboxHandler = () => {
    updateState((prev) => ({
      isRemember: !prev.isRemember,
    }));
  };

  useEffect(() => {
    if (state.user) {
      if (length > 2) return goBack();

      return replace('/');
    }
  }, [state.user]);

  const redirectToSignUp = () => {
    push(ROUTES.signUp);
  };

  const signInHandler = async () => {
    try {
      const { data } = await trackPromise(
        signIn(state.signInData),
        PROMISES_AREA.signIn
      );

      Toast.fire({
        icon: 'success',
        title: 'Signed in successfully',
      });

      updateState({ user: data.user });
      storageService.setToken(data.token, state.isRemember);
      storageService.setUser(data.user);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 400) {
          return UserErrorMessages['400'].fire();
        }
        if (error.response?.status === 404) {
          return UserErrorMessages['404'].fire();
        }

        return errorMessage(error?.response?.data.message).fire();
      }
    }
  };

  const onChangeSignInData = (event: ChangeEvent<HTMLInputElement>) => {
    updateState((prev) => ({
      signInData: {
        ...prev.signInData,
        [event.target.name]: event.target.value.trim(),
      },
    }));
  };

  const redirectToResetPassword = () => {
    push(ROUTES.resetPassword);
  };

  return {
    onChangeSignInData,
    signInHandler,
    redirectToSignUp,
    checkboxHandler,
    redirectToResetPassword,
    ...state,
  };
};
