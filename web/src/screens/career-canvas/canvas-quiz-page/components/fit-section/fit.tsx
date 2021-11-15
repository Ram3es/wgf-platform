import React, { FC } from 'react';

import { HeaderSectionStyled } from '../header-section.styles';
import { FitStyled as Styled } from './fit.styles';

export const Fit: FC = () => {
  return (
    <div>
      <HeaderSectionStyled.TitleWrapper>
        <h1>My VALUES</h1>
        <HeaderSectionStyled.SectionLogo>FIT</HeaderSectionStyled.SectionLogo>
      </HeaderSectionStyled.TitleWrapper>
      <Styled.Content></Styled.Content>
    </div>
  );
};
