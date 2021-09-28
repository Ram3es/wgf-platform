import axios from 'axios';
import { ChangeEvent, useEffect } from 'react';
import { trackPromise } from 'react-promise-tracker';
import { useHistory } from 'react-router-dom';

import { useUpdateState } from '@services/hooks/useUpdateState';
import { storageService } from '@services/storage/storage';
import { signUp } from '@services/user.service';

import { errorMessage, UserErrorMessages } from '@constants/pop-up-messages';
import { PROMISES_AREA } from '@constants/promises-area';
import { ROUTES } from '@constants/routes';
import { Toast } from '@constants/toasts';
import { initialSignUpState } from './sign-up.constants';

export const useSignUpState = () => {
  const { state, updateState } = useUpdateState(initialSignUpState);
  const { replace, goBack, length } = useHistory();

  useEffect(() => {
    const user = storageService.getUser();
    const token = storageService.getToken();

    if (user && token) {
      return replace('/');
    }
  }, []);

  useEffect(() => {
    if (state.user) {
      if (length > 2) return goBack();

      return replace('/');
    }
  }, [state.user]);

  const redirectToSignIn = () => {
    replace(ROUTES.signIn);
  };

  const signUpHandler = async () => {
    try {
      const { data } = await trackPromise(
        signUp({
          ...state.signUpData,
          firstName: state.signUpData.firstName.trim(),
          lastName: state.signUpData.lastName.trim(),
        }),
        PROMISES_AREA.signUp
      );

      Toast.fire({
        icon: 'success',
        title: 'Signed up successfully',
      });

      updateState({ user: data.user });
      storageService.setToken(data.token, false);
      storageService.setUser(data.user);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 409) {
          return UserErrorMessages['409'].fire();
        }

        return errorMessage(error?.response?.data.message).fire();
      }
    }
  };

  const onChangeUser = (event: ChangeEvent<HTMLInputElement>) => {
    updateState((prev) => ({
      signUpData: {
        ...prev.signUpData,
        [event.target.name]:
          event.target.name === 'email' || event.target.name === 'password'
            ? event.target.value.trim()
            : event.target.value,
      },
    }));
  };

  return {
    onChangeUser,
    signUpHandler,
    redirectToSignIn,
    ...state,
  };
};
