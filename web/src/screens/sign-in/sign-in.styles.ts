import styled, { css } from 'styled-components';

import { COLORS } from '@styles/colors';
import { FONTS } from '@styles/fonts';

export const SignInStyles = {
  Wrapper: styled.div`
    font-size: ${FONTS.sizes[14]};

    h1 {
      font-family: ${FONTS.family.absideSmooth};
      font-weight: 400;
    }

    button {
      font-weight: 400;
      font-family: ${FONTS.family.poppinsRegular};
      font-size: ${FONTS.sizes[14]};
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
  FormLabel: styled.p`
    font-size: ${FONTS.sizes[14]};
    margin-bottom: 10px;
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
  Footer: styled.div`
    display: flex;
    align-items: center;
    padding-top: 20px;

    button {
      margin-left: -10px;
    }
  `,
};
