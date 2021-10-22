import React, { useState } from 'react';

import { Icon } from '@components/icon';

import { IMAGES } from '@constants/images';
import { navigationRoles, sectionColors } from './navigation-bar.constants';

import { INavigationBarProps } from './navigation-bar.typings';

import { NavigationBarStyles as Styled } from './navigation-bar.styles';

export const NavigationBar: React.FC<INavigationBarProps> = ({
  activeDashboardItem,
  setActiveItem,
  user,
}) => {
  const [isActiveBurger, setisActiveBurger] = useState<boolean>(false);

  const toogleActive = () => setisActiveBurger((prev) => !prev);

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
        {navigationRoles[user.role].map((section, key) => (
          <Styled.Section key={key}>
            <Styled.SectionTitle color={sectionColors[section.title]}>
              <img src={IMAGES[section.title]} />
              <span>{section.title}</span>
            </Styled.SectionTitle>
            {section.items.map((item, index) => (
              <Styled.Item
                key={index}
                isActive={item === activeDashboardItem}
                onClick={setActiveItem(item)}
                section={section.title}
                color={sectionColors[section.title]}
              >
                {section.title === 'Assessment' ? (
                  <img src={IMAGES[item]} />
                ) : (
                  <Icon type={item} />
                )}
                <span>{item}</span>
              </Styled.Item>
            ))}
          </Styled.Section>
        ))}
      </Styled.Wrapper>
    </>
  );
};
