import styled, { css } from 'styled-components';

import { COLORS } from '@styles/colors';
import { FONTS } from '@styles/fonts';
import { Media } from '@styles/media';
import { Z_INDEX } from '@styles/z-indexes';

export const CareerDesignStyles = {
  Wrapper: styled.div`
    margin-left: 10px;
    position: relative;
    width: 100%;
    padding-top: 35px;
    border-top-left-radius: 20px;
    overflow: hidden;
    min-height: calc(100vh - 95px);

    ${Media.desktop1600`
       padding: 70px 200px;
    `}

    ${Media.landscape`
       padding: 20px 50px;
    `}

    ${Media.tablet`
      width: 100%;
      min-height: calc(100vh - 135px);
      border-top-left-radius: 0;
      margin-left: 0px;
    `}
    ${Media.mobile`
       padding: 20px 0;
    `}
  `,
  WrapContent: styled.div`
    padding: 0 30px;

    ${Media.mobile`
       padding: 0 20px;
    `}
  `,

  Content: styled.div`
    position: relative;
    z-index: ${Z_INDEX.medium};
    padding: 0 40px;
    width: 100%;
    text-align: center;
    margin-bottom: 40px;
    p {
      padding-top: 50px;
      font-size: ${FONTS.sizes[35]};
      color: ${COLORS.grey};
      font-family: ${FONTS.family.absideSmooth};
      ${Media.smallLandscape(css`
        font-size: ${FONTS.sizes[20]};
      `)}
    }
    ${Media.mobile`
       padding: 0;
    `}
  `,

  Text: styled.div`
    color: ${COLORS.grey};
    line-height: 2;
    font-size: ${FONTS.sizes[24]};
    text-indent: 30px;
    text-align: justify;
    margin-bottom: 70px;
    padding: 0 90px;

    a {
      font-family: ${FONTS.family.absideSmooth};
    }
    ${Media.smallLandscape(css`
      font-size: ${FONTS.sizes[18]};
    `)}

    ${Media.mobile`
       padding: 0 10px;
    `}
  `,
  BtnWrapper: styled.div`
    display: flex;
    justify-content: space-around;

    ${Media.mobile`
    display: block;
    /* align-items: center; */
    justify-content: center;
    button {
      margin: auto;
    }
    > * {
     &:first-child {
      margin-bottom:15px ;
    }
  }
    `}
  `,
};
