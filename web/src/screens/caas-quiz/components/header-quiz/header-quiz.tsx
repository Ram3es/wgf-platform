import React from 'react';
import { NavLink } from 'react-router-dom';

import { IMAGES } from '@constants/images';
import { ROUTES } from '@constants/routes';
import { STRINGS } from '@constants/strings';

import { HeaderStyles as Styled } from './header-quiz.styles';

export const HeaderQuiz: React.FC = () => (
  <Styled.Wrapper>
    <Styled.ProductLogo>
      <img src={IMAGES.productLogo} alt={STRINGS.altLogo} />
    </Styled.ProductLogo>
    <Styled.CompanyLogo>
      <NavLink to={ROUTES.main}>
        <img src={IMAGES.companyLogo} alt={STRINGS.altLogo} />
      </NavLink>
    </Styled.CompanyLogo>
  </Styled.Wrapper>
);
