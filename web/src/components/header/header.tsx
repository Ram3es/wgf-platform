import React from 'react';

import { images } from '@constants/images';
import { STRINGS } from '@constants/strings';

import { HeaderStyles } from './header.styles';

export const Header: React.FC = () => (
  <HeaderStyles.Wrapper>
    <HeaderStyles.ProductLogo>
      <img src={images.productLogo} alt={STRINGS.altLogo} />
    </HeaderStyles.ProductLogo>
    <HeaderStyles.CompanyLogo>
      <img src={images.companyLogo} alt={STRINGS.altLogo} />
    </HeaderStyles.CompanyLogo>
  </HeaderStyles.Wrapper>
);
