import { FC, useState } from 'react';

import { Icon } from '@components/icon';

import { ABOUT_NAVBAR_OPTIONS, NAVBAR_MENU, WGF_NAVBAR_OPTIONS } from '@constants/navbar';

import { NavBarStyles as Styled } from './burger-navbar.styles';

export const BurgerNavbar: FC<{ isActiveMenu: boolean }> = (props) => {
  const { isActiveMenu } = props;
  const [isAboutModalShown, setIsAboutModalShown] = useState<boolean>(false);
  const [isModalWGFFrameworkOpen, setIsModalWGFFrameworkOpen] =
    useState<boolean>(false);
  const toggleAboutModalOpen = () => {
    setIsAboutModalShown((prev) => !prev);
  };
  const toggleWGFFrameworkModal = () => {
    setIsModalWGFFrameworkOpen((prev) => !prev);
  };
  return (
    <Styled.NavBarWrapper>
      <Styled.NavLink onClick={toggleAboutModalOpen}>
        About <Icon type="arrowDown" />
      </Styled.NavLink>
      {isAboutModalShown && (
        <Styled.AboutModal>
          <Styled.AboutOptions onClick={toggleWGFFrameworkModal}>
            Wit Grit Fit Framework <Icon type="arrowDown" />
          </Styled.AboutOptions>
          {isModalWGFFrameworkOpen && (
            <Styled.ModalWGF>
              {WGF_NAVBAR_OPTIONS.map((item) => {
                return (
                  <Styled.AboutOptions key={item.title}>
                    <a href={item.href} target="_blank" rel="noreferrer">
                      {item.title}
                    </a>
                  </Styled.AboutOptions>
                );
              })}
            </Styled.ModalWGF>
          )}
          {ABOUT_NAVBAR_OPTIONS.map((item) => {
            return (
              <Styled.AboutOptions key={item.title}>
                <a href={item.href} target="_blank" rel="noreferrer">
                  {item.title}
                </a>
              </Styled.AboutOptions>
            );
          })}
        </Styled.AboutModal>
      )}
      {NAVBAR_MENU.map((item) => {
        return (
          <Styled.NavLink
            key={item.title}
            href={item.href}
            target="_blank"
            rel="noreferrer"
          >
            {item.title}
          </Styled.NavLink>
        );
      })}
    </Styled.NavBarWrapper>
  );
};
