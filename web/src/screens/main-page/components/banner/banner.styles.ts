import styled from 'styled-components';

import { COLORS } from '@styles/colors';
import { FONT_SIZES } from '@styles/font-sizes';
import { Media } from '@styles/media';

export const BannerStyles = {
  Wrapper: styled.div`
    position: relative;
    z-index: 1;
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    padding: 20px 0 100px;

    ${Media.smallLandscape`
      flex-direction: column;
      align-items: center;
      padding: 0 0 30px;
    `}
  `,

  Title: styled.h1`
    position: relative;
    z-index: 1;
    font-size: ${FONT_SIZES.h1};
    font-weight: 700;
    color: ${COLORS.greyLite};

    ${Media.smallLandscape`
      margin-bottom: 100px;
    `}

    ${Media.desktop`
      padding-left: 150px;
    `}

    ${Media.mobile`
      font-size: 30px;
    `}
    ${Media.xsMobile`
      font-size: 25px;
    `}
  `,

  Text: styled.div`
    position: relative;
    z-index: 1;
    text-align: center;
    max-width: 440px;

    ${Media.desktop`
      max-width: 630px;
    `}

    p {
      ${Media.mobile`
      font-size: 15px;
    `}
    }
  `,
};
