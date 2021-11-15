import React, { FC } from 'react';

import { HeaderSectionStyled } from '../header-section.styles';
import { MySkillsStyled as Styled } from './my-skills.styles';

export const MySkills: FC = () => {
  return (
    <div>
      <HeaderSectionStyled.TitleWrapper>
        <h1>My SKILLS</h1>
      </HeaderSectionStyled.TitleWrapper>
      <Styled.Content></Styled.Content>
    </div>
  );
};
