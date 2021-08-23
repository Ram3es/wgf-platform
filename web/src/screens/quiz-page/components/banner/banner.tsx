import React from 'react';

import { STRINGS } from '@constants/strings';

import { BannerStyles } from './banner.styles';

export const Banner: React.FC = () => (
  <BannerStyles.Wrapper>
    <BannerStyles.Title>{STRINGS.banner.title}</BannerStyles.Title>
    <BannerStyles.Text>
      {STRINGS.banner.text.map((item, i) => (
        <p key={i}>{item}</p>
      ))}
    </BannerStyles.Text>
  </BannerStyles.Wrapper>
);
