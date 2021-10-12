import React, { useEffect, useState } from 'react';
import { trackPromise } from 'react-promise-tracker';
import { NavLink, useHistory } from 'react-router-dom';

import { Button } from '@components/button';
import { Loader } from '@components/loader';
import { Select } from '@components/select';
import { COLORS } from '@styles/colors';

import { storageService } from '@services/storage/storage';
import { logOut } from '@services/user.service';

import { IMAGES } from '@constants/images';
import { PROMISES_AREA } from '@constants/promises-area';
import { ROUTES } from '@constants/routes';
import { STRINGS } from '@constants/strings';
import { Toast } from '@constants/toasts';
import { loginedOptions, loginedOptionsList } from './header.constants';

import { HeaderStyles as Styled } from './header.styles';

export const Header: React.FC = () => {
  const { push } = useHistory();

  const [isLogined, setIsLogined] = useState(false);
  const [isDropdownActive, setIsDropdownActive] = useState(false);
  const [selected, setSelected] = useState('');

  const user = storageService.getUser();
  const token = storageService.getToken();

  useEffect(() => {
    if (user && token) {
      setIsLogined(true);
    }
  }, [user, token]);

  useEffect(() => {
    if (selected === loginedOptions.dashboard) {
      push(ROUTES.dashboard);
    }

    if (selected === loginedOptions.logout) {
      logOutHandler();
    }
  }, [selected]);

  const logOutHandler = async () => {
    await trackPromise(logOut(), PROMISES_AREA.logOut);

    storageService.clearSessionStorage();
    storageService.clearStorage();

    Toast.fire({
      icon: 'success',
      title: 'Log Out successfully',
    });

    setIsLogined(false);
    push('/');
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

  return (
    <Styled.Wrapper>
      <NavLink to={ROUTES.main}>
        <img src={IMAGES.companyLogo} alt={STRINGS.altLogo} />
      </NavLink>
      <Loader area={PROMISES_AREA.logOut}>
        {isLogined ? (
          <Styled.LoginedWrapper>
            <Styled.LoginedContent
              onClick={openDpopdown}
              isActive={isDropdownActive}
            >
              <Styled.AvatarWrapper>
                <img src={user?.avatar || IMAGES.userProfile} />
              </Styled.AvatarWrapper>
              <span>
                {user?.firstName} {user?.lastName}
              </span>
            </Styled.LoginedContent>
            {isDropdownActive && (
              <Styled.LoginDropdown>
                <Select
                  options={loginedOptionsList}
                  setSelected={selectedChange}
                  isFullWidth
                  setIsActive={handleDpopdownActive}
                />
              </Styled.LoginDropdown>
            )}
          </Styled.LoginedWrapper>
        ) : (
          <Button
            onClick={loginHandler}
            color={COLORS.grey}
            title={STRINGS.button.logIn}
          />
        )}
      </Loader>
    </Styled.Wrapper>
  );
};
