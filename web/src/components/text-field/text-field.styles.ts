import styled from 'styled-components';

import { COLORS } from '@styles/colors';
import { FONT_SIZES } from '@styles/font-sizes';

import { ITextFieldStylesProps } from './text-field.typings';

export const TextFieldStyled = {
  Wrapper: styled.div<ITextFieldStylesProps>`
    position: relative;
    margin-bottom: 30px;

    input {
      padding: 9.5px 20px;
      background: ${COLORS.greyLite};
      border: 1px solid ${COLORS.white};
      border-radius: 40px;
      font-size: ${FONT_SIZES.medium};
      font-family: inherit;
      font-weight: 700;
      width: ${({ isFullWidth, width }) =>
        isFullWidth ? '100%' : width || 'auto'};
      height: ${({ height }) => height || 'auto'};
      color: ${COLORS.default};
      transition: 0.3s;

      :hover,
      :focus,
      :focus-visible {
        box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.15) !important;
        -webkit-box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.15) !important;
        border: 1px solid ${COLORS.white} !important;
        outline: none !important;
        -webkit-outline: none !important;
        ${({ error }) =>
          error &&
          `
            box-shadow: 0px 4px 15px rgba(223, 0, 3, 0.2);
            -webkit-box-shadow: 0px 4px 15px rgba(223, 0, 3, 0.2);
          `}
      }

      ::placeholder {
        color: ${COLORS.grey};
      }
    }
  `,

  ErrorBlock: styled.div`
    position: absolute;
    padding: 10px;
    color: ${COLORS.red};
    font-size: ${FONT_SIZES.small};
    font-weight: 400;
    border-radius: 5px;
    z-index: 1;
  `,
};
