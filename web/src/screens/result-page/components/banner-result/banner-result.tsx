import React from 'react';

import { STRINGS } from '@constants/strings';

import { IBannerResultProps } from './banner-result.typings';

import { BannerStyles } from './banner-result.styles';

export const BannerResult: React.FC<IBannerResultProps> = ({
  withBackground,
}) => (
  <BannerStyles.Wrapper>
    <BannerStyles.Title>{STRINGS.banner.title}</BannerStyles.Title>
    <BannerStyles.Body>
      <BannerStyles.Text>
        <h1>{STRINGS.banner.titleResult}</h1>
        {STRINGS.banner.text.map((item, i) => (
          <p key={i}>{item}</p>
        ))}
      </BannerStyles.Text>
      {withBackground && <BannerStyles.Image />}
    </BannerStyles.Body>
  </BannerStyles.Wrapper>
);
