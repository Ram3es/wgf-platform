import React from 'react';

import { BannerStyles } from './banner.styles';

export const Banner: React.FC = () => (
  <BannerStyles.Wrapper>
    <BannerStyles.Title>My Career Adaptation</BannerStyles.Title>
    <BannerStyles.Text>
      <p>
        Different people use different strengths to build their careers. No one
        is good at everything, each of us emphasizes some strengths more than
        others.
      </p>
    </BannerStyles.Text>
  </BannerStyles.Wrapper>
);
