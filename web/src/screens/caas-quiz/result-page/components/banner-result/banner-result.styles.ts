import styled, { css } from 'styled-components';

import { COLORS } from '@styles/colors';
import { FONT_SIZES } from '@styles/font-sizes';
import { FONTS } from '@styles/fonts';
import { Media } from '@styles/media';

import { IMAGES } from '@constants/images';

export const BannerStyles = {
  Wrapper: styled.div`
    position: relative;
    z-index: ${Z_INDEX.low};
    padding: 0 0 50px;
    border-bottom: 2px solid ${COLORS.greenLite};
    margin-bottom: 50px;

    @media print {
      display: flex;
    }

    ${Media.smallLandscape`
      padding: 20px 0 50px;
    `}

    ${Media.tablet`
      border: 0;
      margin: 0;
      padding: 20px 0 20px;
    `}
    
    ${Media.mobile`
      padding: 0 0 20px;
    `}

    @media print {
      -webkit-print-color-adjust: exact;
      print-color-adjust: exact;
    }
  `,

  Title: styled.h1`
    position: relative;
    z-index: ${Z_INDEX.low};
    font-weight: 700;
    font-family: ${FONTS.frutigerBold};
    color: ${COLORS.greyLite};
    margin-bottom: 150px;
    font-size: ${FONT_SIZES.titleMain};
    padding-left: 100px;

    ${Media.landscapeWreck`
      padding-left: 140px;
    `}

    ${Media.landscape`
      padding-left: 75px;
    `}

    ${Media.smallLandscape(css`
      padding-left: 0;
      text-align: center;
      font-size: ${FONT_SIZES.titleMainLandscape};
      margin-bottom: 100px;
    `)}

    ${Media.desktop`
      padding-left: 260px;
    `}

    ${Media.mobile(css`
      font-size: ${FONT_SIZES.titleMainMobile};
      margin-bottom: 80px;
    `)}
    
    ${Media.xsMobile(css`
      font-size: ${FONT_SIZES.titleMainXsMobile};
    `)}

    @media print {
      margin-bottom: 60px;
      margit-top: -10px;
      padding-left: 255px;
    }
  `,

  Body: styled.div`
    display: flex;
    align-items: center;

    @media print {
      justify-content: flex-end;
      align-items: flex-start;
    }

    ${Media.tablet`
    flex-wrap: wrap-reverse;
    justify-content: center;
    `}
  `,
  Image: styled.div`
    min-height: 250px;
    width: 53%;
    background-image: url(${IMAGES.bannerResultLandscape});
    background-repeat: no-repeat;
    background-size: contain;
    background-position: top 0 left 100%;

    ${Media.desktop(css`
      width: 65%;
      background-image: url(${IMAGES.bannerResultDesktop});
    `)}

    ${Media.landscape`
      min-height: 210px;
    `}

    ${Media.smallLandscape`
      min-height: 170px;
    `}


    ${Media.tablet(css`
      width: 100%;
      min-height: 200px;
      background-image: url(${IMAGES.bannerResultMobile});
      background-position: center;
    `)}

    @media print {
      display: none;
    }
  `,
  Text: styled.div`
    position: relative;
    z-index: ${Z_INDEX.low};
    text-align: left;
    margin-right: 20px;
    width: 47%;

    ${Media.desktop`
      width: 35%;
    `}

    @media print {
      width: 75%;
      margin-top: -50px;
      margin-right: 50px;
    }

    p:first-of-type {
      margin-bottom: 20px;
    }

    ${Media.tablet`
      width: auto;
      max-width: 440px;
      text-align: center;
    `}

    h1 {
      font-size: ${FONT_SIZES.title1};
      color: ${COLORS.grey};
      font-weight: 700;
      font-family: ${FONTS.frutigerBold};
      margin-bottom: 20px;

      ${Media.mobile(css`
        font-size: ${FONT_SIZES.title1Mobile};
      `)}
    }

    p {
      ${Media.mobile(css`
        font-size: ${FONT_SIZES.defaultMobile};
      `)}
    }
  `,
};
