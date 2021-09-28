import React, { useEffect, useState } from 'react';
import { trackPromise } from 'react-promise-tracker';
import { NavLink, useHistory } from 'react-router-dom';

import { Button } from '@components/button';
import { Loader } from '@components/loader';
import { COLORS } from '@styles/colors';

import { storageService } from '@services/storage/storage';
import { logOut } from '@services/user.service';

import { IMAGES } from '@constants/images';
import { PROMISES_AREA } from '@constants/promises-area';
import { ROUTES } from '@constants/routes';
import { STRINGS } from '@constants/strings';
import { Toast } from '@constants/toasts';

import { HeaderStyles as Styled } from './header.styles';

export const Header: React.FC = () => {
  const { push } = useHistory();

  const [isLogOut, setIsLogOut] = useState(false);

  useEffect(() => {
    const user = storageService.getUser();
    const token = storageService.getToken();

    if (user && token) {
      setIsLogOut(true);
    }
  }, []);

  const logOutHandler = async () => {
    await trackPromise(logOut(), PROMISES_AREA.logOut);

    storageService.clearSessionStorage();
    storageService.clearStorage();

    Toast.fire({
      icon: 'success',
      title: 'Log Out successfully',
    });

    setIsLogOut(false);
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
        {isLogOut ? (
          <Button
            onClick={logOutHandler}
            color={COLORS.grey}
            title={STRINGS.button.logOut}
          />
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
