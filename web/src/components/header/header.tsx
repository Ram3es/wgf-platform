import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { NavLink, useHistory } from 'react-router-dom';

import { Button } from '@components/button';
import { COLORS } from '@styles/colors';

import { storageService } from '@services/storage/storage';
import { logOut } from '@services/user.service';

import { IMAGES } from '@constants/images';
import { errorMessage } from '@constants/pop-up-messages';
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
    try {
      await logOut();

      storageService.clearSessionStorage();
      storageService.clearStorage();

      Toast.fire({
        icon: 'success',
        title: 'Log Out successfully',
      });

      setIsLogOut(false);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return errorMessage(error?.response?.data.message).fire();
      }
    }
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
    </Styled.Wrapper>
  );
};
