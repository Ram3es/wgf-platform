import React, { useState } from 'react';

import { BurgerNavbar } from '@components/burger-navbar/burger-navbar';
import { Icon } from '@components/icon';

import { storageService } from '@services/storage/storage';

import { FLEX_QUIZ } from '@constants/flex-quiz';
import { IMAGES } from '@constants/images';
import { navigationRoles, sectionColors } from './navigation-bar.constants';

import { INavigationBarProps } from './navigation-bar.typings';

import { NavigationBarStyles as Styled } from './navigation-bar.styles';

export const NavigationBar: React.FC<INavigationBarProps> = ({ user }) => {
  const [isActiveBurger, setisActiveBurger] = useState<boolean>(false);
  const toogleActive = () => setisActiveBurger((prev) => !prev);

  const redirectToFlexCooperationQuiz = () => {
    storageService.setQuiz(FLEX_QUIZ.careerFlexPlus);
  };

  const redirectToFlexQuiz = () => {
    storageService.setQuiz(FLEX_QUIZ.careerFlex);
  };

  return (
    <>
      <Styled.BurgerMenu>
        <Styled.LineWrapper onClick={toogleActive}>
          <Styled.LineTop isActiveMenu={isActiveBurger} />
          <Styled.LineMiddle isActiveMenu={isActiveBurger} />
          <Styled.LineBottom isActiveMenu={isActiveBurger} />
        </Styled.LineWrapper>
      </Styled.BurgerMenu>

      <Styled.Wrapper isActiveMenu={isActiveBurger}>
        <BurgerNavbar isActiveMenu={isActiveBurger} />
        {navigationRoles[user.role].map((section, key) => (
          <Styled.Section key={key}>
            <Styled.SectionTitle color={sectionColors[section.title]}>
              <img src={IMAGES[section.title]} />
              <span>{section.title}</span>
            </Styled.SectionTitle>
            {section.items.map((item, index) => (
              <div
                key={index}
                onClick={
                  item.title === 'CareerFlex+'
                    ? redirectToFlexCooperationQuiz
                    : item.title === 'CareerFlex'
                    ? redirectToFlexQuiz
                    : undefined
                }
              >
                <Styled.Item
                  section={section.title}
                  color={sectionColors[section.title]}
                  to={item.route}
                  activeClassName="selected"
                >
                  {section.title === 'Assessment' ? (
                    <img src={IMAGES[item.title]} />
                  ) : (
                    <Icon type={item.title} />
                  )}
                  <span>{item.title}</span>
                </Styled.Item>
              </div>
            ))}
          </Styled.Section>
        ))}
      </Styled.Wrapper>
    </>
  );
};
