import styled from 'styled-components';

import { COLORS } from '@styles/colors';
import { Media } from '@styles/media';

export const BannerImageStyles = styled.div`
  position: absolute;
  right: 50%;
  bottom: 100%;
  margin-bottom: -300px;
  width: 50%;
  min-width: 620px;

  ${Media.smallLandscape`
      width: 100%;
      top: 0;
      left: 0;
      min-width: auto;
      margin-bottom: -340px;
  `}

  ${Media.mobile`
      top: 40px;
      margin-bottom: -300px;
  `}

  svg {
    width: 100%;
    height: 100%;
  }

  @media print {
    top: -120px;
    left: -40px;
    width: 55%;

    svg {
      width: 100%;
      height: 100%;

      path {
        fill: ${COLORS.greenLite};
      }
    }
  }
`;