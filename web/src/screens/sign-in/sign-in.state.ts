import axios from 'axios';
import { ChangeEvent, useEffect } from 'react';
import { trackPromise } from 'react-promise-tracker';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { loginUser } from '@store/reducers/user.slice';
import { AppDispatch } from '@store/store';

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
  const { replace, length, goBack } = useHistory();

  const user = useSelector((state) => state);

  const dispatch = useDispatch<AppDispatch>();

  const { state, updateState } =
    useUpdateState<ISignInState>(initialSignInState);

  const checkboxHandler = () => {
    updateState((prev) => ({
      isRemember: !prev.isRemember,
    }));
  };

  useEffect(() => {
    const token = storageService.getToken();

    if (token && user) {
      if (length > 2) return goBack();

      return replace('/');
    }
  }, [user]);

  const redirectToSignUp = () => {
    replace(ROUTES.signUp);
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

      dispatch(loginUser(data.user));

      storageService.setToken(data.token, state.isRemember);
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
    replace(ROUTES.resetPassword);
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
