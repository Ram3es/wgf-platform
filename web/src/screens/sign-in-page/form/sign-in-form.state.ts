import axios from 'axios';
import { trackPromise } from 'react-promise-tracker';
import { useHistory, useLocation } from 'react-router-dom';
import { ChangeEvent, useEffect, useState } from 'react';

import { Toast } from '@constants/toasts';
import { ROUTES } from '@constants/routes';
import { PROMISES_AREA } from '@constants/promises-area';
import { errorMessage, UserErrorMessages } from '@constants/pop-up-messages';

import { loginUser } from '@store/reducers/user.slice';

import { signIn } from '@services/user.service';
import { useUpdateState } from '@services/hooks/useUpdateState';
import { storageService } from '@services/storage/storage';
import { useAppDispatch, useAppSelector } from '@services/hooks/redux';

import { initialSignInState } from './sign-in.constants';
import { ISignInState } from './sign-in.typings';

export const useSignInState = () => {
  const { replace, goBack, length } = useHistory();

  const location = useLocation<ILocationState>();

  const { user } = useAppSelector((state) => state);

  const dispatch = useAppDispatch();

  const { state, updateState } =
    useUpdateState<ISignInState>(initialSignInState);

  const [isPasswordShown, setIsPasswordShown] = useState(false);

  const checkboxHandler = () => {
    updateState((prev) => ({
      isRemember: !prev.isRemember,
    }));
  };

  useEffect(() => {
    const token = storageService.getToken();

    if (token && user) {
      return location.state
        ? replace(location.state?.from.pathname)
        : length > 2
        ? goBack()
        : replace(ROUTES.main);
    }
  }, [user]);

  const redirectToSignUp = () => {
    replace(ROUTES.signUp, location.state);
  };

  const signInHandler = async () => {
    try {
      const { data } = await trackPromise(
        signIn(state.signInData),
        PROMISES_AREA.auth
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

  const toggleShowPassword = () => {
    setIsPasswordShown((prev) => !prev);
  };

  return {
    onChangeSignInData,
    signInHandler,
    redirectToSignUp,
    checkboxHandler,
    redirectToResetPassword,
    isPasswordShown,
    toggleShowPassword,
    ...state,
  };
};
