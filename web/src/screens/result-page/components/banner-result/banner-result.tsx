import React from 'react';

import { STRINGS } from '@constants/strings';

import { BannerStyles } from './banner-result.styles';

export const Banner: React.FC = () => (
  <BannerStyles.Wrapper>
    <BannerStyles.Title>{STRINGS.banner.title}</BannerStyles.Title>
    <BannerStyles.Body>
      <BannerStyles.Text>
        <h1>{STRINGS.banner.titleResult}</h1>
        <p>{STRINGS.banner.text}</p>
      </BannerStyles.Text>
      <BannerStyles.Image />
    </BannerStyles.Body>
  </BannerStyles.Wrapper>
);
