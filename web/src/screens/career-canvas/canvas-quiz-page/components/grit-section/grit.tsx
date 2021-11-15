import React, { FC } from 'react';

import { HeaderSectionStyled } from '../header-section.styles';
import { GritStyled as Styled } from './grit.styles';

export const Grit: FC = () => {
  return (
    <div>
      <HeaderSectionStyled.TitleWrapper>
        <h1>My PERFORMANCE CHARACTER</h1>
        <HeaderSectionStyled.SectionLogo>GRIT</HeaderSectionStyled.SectionLogo>
      </HeaderSectionStyled.TitleWrapper>
      <Styled.Content></Styled.Content>
    </div>
  );
};
