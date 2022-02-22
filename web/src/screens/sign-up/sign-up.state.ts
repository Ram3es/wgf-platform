import axios from 'axios';
import { ChangeEvent, useEffect, useState } from 'react';
import { trackPromise } from 'react-promise-tracker';
import { useHistory } from 'react-router-dom';

import { loginUser } from '@store/reducers/user.slice';

import { useAppDispatch, useAppSelector } from '@services/hooks/redux';
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

  const { user } = useAppSelector((state) => state);

  const dispatch = useAppDispatch();
  const [isPasswordShown, setIsPasswordShown] = useState(false);

  useEffect(() => {
    const token = storageService.getToken();

    if (token && user) {
      if (length > 2) return goBack();

      return replace('/');
    }
  }, [user]);

  const redirectToSignIn = () => {
    replace(ROUTES.signIn);
  };

  const signUpHandler = async () => {
    try {
      const { data } = await trackPromise(
        signUp({
          ...state,
          firstName: state.firstName.trim(),
          lastName: state.lastName.trim(),
        }),
        PROMISES_AREA.auth
      );

      Toast.fire({
        icon: 'success',
        title: 'Signed up successfully',
      });

      dispatch(loginUser(data.user));

      storageService.setToken(data.token, false);
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
    const { name, value } = event.target;
    updateState({
      [name]: ['email', 'password'].includes(name) ? value.trim() : value,
    });
  };
  const toggleShowPassword = () => {
    setIsPasswordShown((prev) => !prev);
  };

  return {
    onChangeUser,
    signUpHandler,
    redirectToSignIn,
    state,
    isPasswordShown,
    toggleShowPassword,
  };
};
