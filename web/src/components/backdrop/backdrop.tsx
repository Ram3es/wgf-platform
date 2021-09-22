import React from 'react';

import { IMAGES } from '@constants/images';

import { BackdropStyles as Styled } from './backdrop.styles';

export const Backdrop: React.FC = () => (
  <Styled.Wrapper>
    <Styled.Circle>
      <img src={IMAGES.circleBackdrop} />
    </Styled.Circle>
    <Styled.StarTop>
      <img src={IMAGES.starTopBackdrop} />
    </Styled.StarTop>
    <Styled.Oval>
      <img src={IMAGES.ovalBackdrop} />
    </Styled.Oval>
    <Styled.StarBottom>
      <img src={IMAGES.starBottomBackdrop} />
    </Styled.StarBottom>
  </Styled.Wrapper>
);
