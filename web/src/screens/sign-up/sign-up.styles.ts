import styled, { css } from 'styled-components';

import { COLORS } from '@styles/colors';
import { FONTS } from '@styles/fonts';
import { Media } from '@styles/media';

export const SignUpStyles = {
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
  Footer: styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-top: 20px;

    ${Media.sMobile`
      flex-wrap: wrap;
    
      & > * {
        flex: 0 1 100%;
      }

      & > :first-child {
        margin-bottom: 15px;
      }
    `}
  `,
};
