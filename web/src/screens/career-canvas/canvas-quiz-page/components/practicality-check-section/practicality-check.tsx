import React, { FC } from 'react';

import { HeaderSectionStyled } from '../header-section.styles';
import { PracticalityCheckStyled as Styled } from './practicality-check.styles';

export const PracticalityCheck: FC = () => {
  return (
    <div>
      <HeaderSectionStyled.TitleWrapper>
        <h1>PRACTICALITY CHECK</h1>
      </HeaderSectionStyled.TitleWrapper>
      <Styled.Content></Styled.Content>
    </div>
  );
};
