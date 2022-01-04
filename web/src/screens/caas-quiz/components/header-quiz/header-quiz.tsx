import React from 'react';

import { IMAGES } from '@constants/images';
import { STRINGS } from '@constants/strings';

import { HeaderStyles as Styled } from './header-quiz.styles';

export const HeaderQuiz: React.FC = () => (
  <Styled.Wrapper>
    <Styled.ProductLogo>
      <img src={IMAGES.productLogo} alt={STRINGS.altLogo} />
    </Styled.ProductLogo>
  </Styled.Wrapper>
);
