import styled, { css } from 'styled-components';

import { COLORS } from '@styles/colors';
import { FONTS } from '@styles/fonts';
import { Media } from '@styles/media';

export const FormStyles = {
  FormCard: styled.div`
    max-width: 500px;
    height: auto;
    padding: 30px 70px;
    background: ${COLORS.white};
    border-radius: 12px;
    margin-top: 50px;

    ${Media.mobile`
    padding:20px 30px;
    width:100%;
    margin: 0;
    `}
  `,

  Title: styled.h1`
    font-family: ${FONTS.family.absideSmooth};
    font-weight: 400;
    font-size: ${FONTS.sizes[36]};
    text-align: center;
    margin-bottom: 30px;

    background: linear-gradient(90.09deg, #5448a9 15.64%, #ef60a3 88.33%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  `,
  FormLabel: styled.p`
    text-align: center;
    font-size: ${FONTS.sizes[14]};
    margin-bottom: 10px;
  `,
  Footer: styled.div`
    display: flex;
    align-items: center;
    padding-top: 20px;

    button {
      margin-left: -10px;
    }
  `,
  IconWrapper: styled.div<{ error?: string }>`
    position: relative;
    svg {
      position: absolute;
      z-index: 5;
      top: -60px;
      right: 20px;
      width: 20px;

      ${({ error }) =>
        error
          ? css`
              path {
                fill: ${COLORS.red};
              }
            `
          : css`
              path {
                fill: ${COLORS.grey};
              }
            `}
    }
  `,
  Settings: styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 8px;
    margin-bottom: 20px;

    & > * {
      font-size: ${FONTS.sizes[14]};
      margin: 0;
    }
  `,
  Wrapper: styled.div`
    button,
    span {
      font-weight: 400;
      font-family: ${FONTS.family.poppinsRegular};
      font-size: ${FONTS.sizes[14]};
    }
  `,
};
