import React from 'react';

import { STRINGS } from '@constants/strings';

import { BannerStyles as Styled } from './banner.styles';

export const Banner: React.FC = () => (
  <Styled.Wrapper>
    <Styled.Title>{STRINGS.banner.title}</Styled.Title>
    <Styled.Text>
      {STRINGS.banner.text.map((item, i) => (
        <p key={i}>{item}</p>
      ))}
    </Styled.Text>
  </Styled.Wrapper>
);
