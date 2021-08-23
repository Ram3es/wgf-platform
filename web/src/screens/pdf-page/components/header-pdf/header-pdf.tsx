import React from 'react';

import { IMAGES } from '@constants/images';
import { STRINGS } from '@constants/strings';

import { HeaderStyles } from './header-pdf.styles';

export const HeaderPdf: React.FC = () => (
  <HeaderStyles.Wrapper>
    <HeaderStyles.ProductLogo>
      <img src={IMAGES.productLogoPdf} alt={STRINGS.altLogo} />
      <h1>{STRINGS.banner.title}</h1>
    </HeaderStyles.ProductLogo>
    <HeaderStyles.Text>
      <h2>{STRINGS.banner.title}</h2>
      <p>{STRINGS.banner.text}</p>
    </HeaderStyles.Text>
    <HeaderStyles.CompanyLogo>
      <img src={IMAGES.companyLogo} alt={STRINGS.altLogo} />
    </HeaderStyles.CompanyLogo>
  </HeaderStyles.Wrapper>
);
