import React from 'react';
import { NavLink } from 'react-router-dom';

import { IMAGES } from '@constants/images';
import { ROUTES } from '@constants/routes';
import { STRINGS } from '@constants/strings';

import { HeaderStyles } from './header.styles';

export const Header: React.FC = () => (
  <HeaderStyles.Wrapper>
    <HeaderStyles.ProductLogo>
      <img src={IMAGES.productLogo} alt={STRINGS.altLogo} />
    </HeaderStyles.ProductLogo>
    <HeaderStyles.CompanyLogo>
      <NavLink to={ROUTES.main}>
        <img src={IMAGES.companyLogo} alt={STRINGS.altLogo} />
      </NavLink>
    </HeaderStyles.CompanyLogo>
  </HeaderStyles.Wrapper>
);
