import { useEffect, useState } from 'react';
import { trackPromise } from 'react-promise-tracker';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { clearUser } from '@store/reducers/user.slice';
import { AppDispatch, RootState } from '@store/store';

import { storageService } from '@services/storage/storage';
import { logOut } from '@services/user.service';

import { PROMISES_AREA } from '@constants/promises-area';
import { ROUTES } from '@constants/routes';
import { Toast } from '@constants/toasts';
import { loginedOptions } from './header.constants';

export const useHeaderState = () => {
  const { push } = useHistory();

  const [isLogined, setIsLogined] = useState(false);
  const [isDropdownActive, setIsDropdownActive] = useState(false);
  const [selected, setSelected] = useState('');

  const token = storageService.getToken();

  const { user } = useSelector((state: RootState) => state);

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (token) {
      setIsLogined(true);
    }
  }, [token]);

  useEffect(() => {
    if (selected === loginedOptions.dashboard) {
      push(ROUTES.dashboard);
    }

    if (selected === loginedOptions.logout) {
      logOutHandler();
    }
  }, [selected]);

  const logOutHandler = async () => {
    try {
      await trackPromise(logOut(), PROMISES_AREA.logOut);
    } finally {
      Toast.fire({
        icon: 'success',
        title: 'Log Out successfully',
      });

      storageService.clearSessionStorage();
      storageService.clearStorage();
      dispatch(clearUser());

      setIsLogined(false);
      push('/');
    }
  };

  const selectedChange = (value: string) => {
    setSelected(value);
  };

  const openDpopdown = () => {
    setIsDropdownActive(true);
  };

  const handleDpopdownActive = (value: boolean) => {
    setIsDropdownActive(value);
  };

  const loginHandler = () => {
    push(ROUTES.signUp);
  };

  return {
    isLogined,
    isDropdownActive,
    user,
    loginHandler,
    handleDpopdownActive,
    openDpopdown,
    selectedChange,
  };
};
