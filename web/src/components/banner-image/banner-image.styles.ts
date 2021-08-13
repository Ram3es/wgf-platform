import styled from 'styled-components';

import { Media } from '@styles/media';

export const BannerImageStyles = styled.div`
  position: absolute;
  right: 52%;
  bottom: 100%;
  margin-bottom: -300px;
  width: 48%;
  min-width: 620px;

  ${Media.smallLandscape`
      width: 100%;
      top: 0;
      left: 0;
      min-width: auto;
  `}

  ${Media.mobile`
      top: 40px;
  `}

  svg {
    width: 100%;
    height: 100%;
  }
`;
