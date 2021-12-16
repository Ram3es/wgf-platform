import styled, { css } from 'styled-components';

import { COLORS } from '@styles/colors';
import { FONTS } from '@styles/fonts';
import { Media } from '@styles/media';
import { Z_INDEX } from '@styles/z-indexes';

export const BannerStyles = {
  Wrapper: styled.div`
    position: relative;
    z-index: ${Z_INDEX.low};
    display: flex;
    justify-content: space-between;
    padding: 0 0 30px;

    ${Media.smallLandscape`
      flex-direction: column;
      align-items: center;
      padding: 20px 0 20px;
    `}

    ${Media.tablet`
      padding: 20px 0 10px;
    `}
    
    ${Media.mobile`
      padding: 0 0 10px;
    `}
  `,

  Title: styled.h1`
    position: relative;
    z-index: ${Z_INDEX.low};
    font-size: ${FONTS.sizes[60]};
    font-weight: 700;
    font-family: ${FONTS.family.frutigerBold};
    color: ${COLORS.greyLite};
    padding-left: 100px;

    ${Media.desktop`
      padding-left: 260px;
    `}

    ${Media.landscapeWreck`
      padding-left: 140px;
    `}

    ${Media.landscape`
      padding-left: 75px;
    `}

    ${Media.smallLandscape(css`
      margin-bottom: 80px;
      padding-left: 0;
      font-size: ${FONTS.sizes[50]};
    `)}

    ${Media.mobile(css`
      font-size: ${FONTS.sizes[40]};
      margin-bottom: 70px;
    `)}
    ${Media.sMobile(css`
      margin-bottom: 55px;
    `)}
    ${Media.xsMobile(css`
      font-size: ${FONTS.sizes[30]};
    `)}
  `,

  Text: styled.div`
    position: relative;
    z-index: ${Z_INDEX.low};
    text-align: center;
    max-width: 540px;

    ${Media.desktop`
      max-width: 680px;
    `}

    ${Media.landscape`
      max-width: 420px;
    `}

    ${Media.smallLandscape`
      max-width: none;
    `}

    p {
      ${Media.mobile(css`
        font-size: ${FONTS.sizes[15]};
      `)}

      :first-of-type {
        margin-bottom: 20px;
      }
    }
  `,
};
