import React from 'react';
import { NavLink } from 'react-router-dom';

import { images } from '@constants/images';
import { ROUTES } from '@constants/routes';
import { STRINGS } from '@constants/strings';

import { HeaderStyles } from './header.styles';

export const Header: React.FC = () => (
  <HeaderStyles.Wrapper>
    <HeaderStyles.ProductLogo>
      <NavLink to={ROUTES.main}>
        <img src={images.productLogo} alt={STRINGS.altLogo} />
      </NavLink>
    </HeaderStyles.ProductLogo>
    <HeaderStyles.CompanyLogo>
      <NavLink to={ROUTES.main}>
        <img src={images.companyLogo} alt={STRINGS.altLogo} />
      </NavLink>
    </HeaderStyles.CompanyLogo>
  </HeaderStyles.Wrapper>
);
