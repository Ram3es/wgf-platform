import styled, { css } from 'styled-components';

import { COLORS } from '@styles/colors';
import { FONT_SIZES } from '@styles/font-sizes';
import { FONTS } from '@styles/fonts';
import { Media } from '@styles/media';

export const BannerStyles = {
  Wrapper: styled.div`
    position: relative;
    z-index: 1;
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
    z-index: 1;
    font-size: ${FONT_SIZES.titleMain};
    font-weight: 700;
    font-family: ${FONTS.frutigerBold};
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
      font-size: ${FONT_SIZES.titleMainLandscape};
    `)}

    ${Media.mobile(css`
      font-size: ${FONT_SIZES.titleMainMobile};
      margin-bottom: 70px;
    `)}
    ${Media.sMobile(css`
      margin-bottom: 55px;
    `)}
    ${Media.xsMobile(css`
      font-size: ${FONT_SIZES.titleMainXsMobile};
    `)}
  `,

  Text: styled.div`
    position: relative;
    z-index: 1;
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
        font-size: ${FONT_SIZES.defaultMobile};
      `)}

      :first-of-type {
        margin-bottom: 20px;
      }
    }
  `,
};
