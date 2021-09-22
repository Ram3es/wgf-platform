import React, { useEffect, useState } from 'react';
import { NavLink, useHistory } from 'react-router-dom';

import { Button } from '@components/button';
import { COLORS } from '@styles/colors';

import { storageService } from '@services/storage/storage';

import { IMAGES } from '@constants/images';
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

  const logOut = () => {
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
      {isLogOut ? (
        <Button
          onClick={logOut}
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
    </Styled.Wrapper>
  );
};
