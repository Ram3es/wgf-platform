import axios from 'axios';
import { ChangeEvent, useEffect, useState } from 'react';
import { trackPromise } from 'react-promise-tracker';
import { useHistory, useLocation } from 'react-router-dom';

import { Toast } from '@constants/toasts';
import { ROUTES } from '@constants/routes';
import { PROMISES_AREA } from '@constants/promises-area';
import { errorMessage, UserErrorMessages } from '@constants/pop-up-messages';

import { signUp } from '@services/user.service';
import { storageService } from '@services/storage/storage';
import { useUpdateState } from '@services/hooks/useUpdateState';
import { useAppDispatch, useAppSelector } from '@services/hooks/redux';

import { loginUser } from '@store/reducers/user.slice';

import { initialSignUpState } from './form.constants';

export const useSignUpState = () => {
  const { state, updateState } = useUpdateState(initialSignUpState);
  const { replace, goBack, length } = useHistory();
  const location = useLocation<ILocationState>();

  const { user } = useAppSelector((state) => state);

  const dispatch = useAppDispatch();
  const [isPasswordShown, setIsPasswordShown] = useState(false);

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

  const redirectToSignIn = () => {
    replace(ROUTES.signIn, location.state);
  };

  const signUpHandler = async () => {
    try {
      const { data } = await trackPromise(
        signUp({
          ...state,
          firstName: state.firstName.trim(),
          lastName: state.lastName.trim(),
        }),
        PROMISES_AREA.authSignUp
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
