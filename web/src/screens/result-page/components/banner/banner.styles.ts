import styled, { css } from 'styled-components';

import { COLORS } from '@styles/colors';
import { FONT_SIZES } from '@styles/font-sizes';
import { Media } from '@styles/media';

import { images } from '@constants/images';

export const BannerStyles = {
  Wrapper: styled.div`
    position: relative;
    z-index: 1;
    padding: 20px 0 50px;
    border-bottom: 2px solid ${COLORS.greenLite};
    margin-bottom: 50px;

    ${Media.smallLandscape`
    padding: 0 0 50px;
    `}

    ${Media.tablet`
      border: 0;
      margin: 0;
    `}

    @media print {
      -webkit-print-color-adjust: exact;
      print-color-adjust: exact;
    }
  `,

  Title: styled.h1`
    position: relative;
    z-index: 1;
    font-size: ${FONT_SIZES.title1};
    font-family: 'FrutigerLTStd-Bold';
    font-weight: 700;
    color: ${COLORS.greyLite};
    margin-bottom: 150px;

    @media print {
      padding-left: 100px;
    }

    ${Media.desktop`
      padding-left: 150px;
    `}

    ${Media.smallLandscape`
      text-align: center;
    `}

    ${Media.tablet`
      margin-bottom: 100px;
    `}

    ${Media.mobile(css`
      font-size: ${FONT_SIZES.title1Mobile};
      margin-bottom: 80px;
    `)}
    ${Media.xsMobile(css`
      font-size: ${FONT_SIZES.title1XsMobile};
    `)}
  `,

  Body: styled.div`
    display: flex;
    align-items: center;

    ${Media.tablet`
    flex-wrap: wrap-reverse;
    justify-content: center;
    `}
  `,
  Image: styled.div`
    min-height: 270px;
    width: 53%;
    background-image: url(${images.bannerResultLandscape});
    background-repeat: no-repeat;
    background-size: contain;
    background-position: top 0 left 100%;

    @media print {
      width: 80%;
      min-height: 290px;
      background-image: url(${images.bannerResultDesktop});
    }

    ${Media.desktop(css`
      width: 80%;
      min-height: 290px;
      background-image: url(${images.bannerResultDesktop});
    `)}

    ${Media.smallLandscape`
      min-height: 200px;
    `}


    ${Media.tablet(css`
      width: 100%;
      min-height: 200px;
      background-image: url(${images.bannerResultMobile});
      background-position: center;
    `)}
  `,
  Text: styled.div`
    position: relative;
    z-index: 1;
    text-align: center;
    width: 47%;
    text-align: left;
    margin-right: 20px;

    @media print {
      width: 20%;
    }

    ${Media.desktop`
      width: 20%;
    `}
    ${Media.tablet`
      width: auto;
      max-width: 440px;
      text-align: center;
    `}

    h1 {
      font-size: ${FONT_SIZES.title1};
      color: ${COLORS.grey};
      font-family: 'FrutigerLTStd-Bold';
      font-weight: 700;
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
