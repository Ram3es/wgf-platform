import React from 'react';
import { NavLink } from 'react-router-dom';

import { Button } from '@components/button';
import { DropDown } from '@components/drop-down';
import { Loader } from '@components/loader';
import { COLORS } from '@styles/colors';

import { useHeaderState } from './header.state';

import { IMAGES } from '@constants/images';
import { PROMISES_AREA } from '@constants/promises-area';
import { ROUTES } from '@constants/routes';
import { STRINGS } from '@constants/strings';
import { loginedOptionsList } from './header.constants';

import { HeaderStyles as Styled } from './header.styles';

export const Header: React.FC = () => {
  const {
    isLogined,
    isDropdownActive,
    user,
    selectedChange,
    handleDpopdownActive,
    openDpopdown,
    loginHandler,
  } = useHeaderState();

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
                {user.firstName} {user.lastName}
              </span>
            </Styled.LoginedContent>
            {isDropdownActive && (
              <Styled.LoginDropdown>
                <DropDown
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
