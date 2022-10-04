import styled, { css } from 'styled-components';
import { Media } from '@styles/media';
import { FONTS } from '@styles/fonts';
import { COLORS } from '@styles/colors';

export const COMMON_ASSESSMENT_PAGE = {
  Wrapper: styled.div`
    position: relative;
    width: 100%;
    padding-top: 35px;
    border-top-left-radius: 20px;
    overflow: hidden;
    min-height: calc(100vh - 95px);
    margin-left: 10px;

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

  ${Media.sMobile`
    margin-left: 0px;
    `}
  `,

  WrapContent: styled.div`
    padding: 0 30px;

    ${Media.mobile`
   padding: 0 20px;
`}
  `,
  Title: styled.div`
    width: 100%;
    text-align: center;
    font-size: ${FONTS.sizes[28]};
    line-height: 36px;
    color: ${COLORS.grey};
    font-family: ${FONTS.family.absideSmooth};
    margin-bottom: 20px;

    ${Media.smallLandscape(css`
      font-size: ${FONTS.sizes[20]};
    `)}

    ${Media.mobile`
       padding: 0;
    `}
  `,
  Text: styled.div`
    color: ${COLORS.grey};
    line-height: 24px;
    font-size: ${FONTS.sizes[18]};
    text-indent: 30px;
    text-align: center;
    margin-bottom: 60px;
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
