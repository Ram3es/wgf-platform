import React from 'react';

import { STRINGS } from '@constants/strings';

import { BannerStyles } from './banner.styles';

export const Banner: React.FC = () => (
  <BannerStyles.Wrapper>
    <BannerStyles.Title>{STRINGS.banner.title}</BannerStyles.Title>
    <BannerStyles.Text>
      <p>{STRINGS.banner.text}</p>
    </BannerStyles.Text>
  </BannerStyles.Wrapper>
);
