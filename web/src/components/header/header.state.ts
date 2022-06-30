import { useEffect, useState } from 'react';
import { trackPromise } from 'react-promise-tracker';
import { useHistory, useLocation } from 'react-router-dom';
import { Location } from 'history';

import { clearUser } from '@store/reducers/user.slice';

import { useAppDispatch, useAppSelector } from '@services/hooks/redux';
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
  const [isAboutModalShown, setIsAboutModalShown] = useState<boolean>(false);
  const [isModalWGFFrameworkOpen, setIsModalWGFFrameworkOpen] =
    useState<boolean>(false);
  const { pathname } = useLocation<Location>();

  const token = storageService.getToken();

  const { user } = useAppSelector((state) => state);

  const dispatch = useAppDispatch();

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
    push(ROUTES.signIn);
  };
  const handleMouseEnter = () => {
    setIsModalWGFFrameworkOpen(true);
  };
  const handleMouseLeave = () => {
    setIsModalWGFFrameworkOpen(false);
  };
  const aboutModalHandler = () => {
    setIsAboutModalShown((prev) => !prev);
  };
  return {
    isLogined,
    isDropdownActive,
    user,
    loginHandler,
    handleDpopdownActive,
    openDpopdown,
    selectedChange,
    isAboutModalShown,
    handleMouseEnter,
    isModalWGFFrameworkOpen,
    handleMouseLeave,
    aboutModalHandler,
    pathname,
  };
};
