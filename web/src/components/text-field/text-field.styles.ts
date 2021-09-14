import styled, { css } from 'styled-components';

import { COLORS } from '@styles/colors';
import { FONT_SIZES } from '@styles/font-sizes';
import { FONTS } from '@styles/fonts';
import { Media } from '@styles/media';

import { ITextFieldStylesProps } from './text-field.typings';

export const TextFieldStyled = {
  Wrapper: styled.div<{ error?: string }>`
    position: relative;
    margin-bottom: 15px;

    svg {
      position: absolute;
      left: 13px;
      top: 10px;

      path {
        fill: ${({ error }) => (error ? COLORS.red : COLORS.grey)};
      }
    }
  `,

  Input: styled.input<ITextFieldStylesProps>`
    background: ${COLORS.white};
    border: 0;
    border-radius: 7.5px;
    font-size: ${FONT_SIZES.medium};
    font-weight: 700;
    font-family: ${FONTS.frutigerBold};
    width: ${({ isFullWidth, width }) =>
      isFullWidth ? '100%' : width || 'auto'};
    height: ${({ height }) => height || 'auto'};
    color: ${COLORS.default};
    transition: 0.3s;
    box-shadow: 1.8px 5.4px 14.4px rgba(45, 45, 55, 0.1);
    padding: ${({ type }) =>
      type === 'password' ? '13px 13px 13px 37px' : '13px'};

    ${({ error }) =>
      error &&
      `
        box-shadow: 2.4px 7.2px 19.2px rgba(45, 45, 55, 0.1);
      `}

    ${Media.mobile(css`
      font-size: ${FONT_SIZES.inputMobile};
    `)};

    :hover,
    :focus,
    :focus-visible {
      box-shadow: 0px 6px 17px rgba(0, 0, 0, 0.2);
      -webkit-box-shadow: 0px 6px 17px rgba(0, 0, 0, 0.2);
      outline: none;
      -webkit-outline: none;
      ${({ error }) =>
        error &&
        `
          box-shadow: 0px 4px 15px rgba(223, 0, 3, 0.2);
          -webkit-box-shadow: 0px 4px 15px rgba(223, 0, 3, 0.2);
        `}
    }

    ::placeholder {
      color: ${COLORS.grey};
      font-weight: 400;
      font-family: ${FONTS.frutigerNormal};
    }
  `,

  ErrorBlock: styled.div`
    position: absolute;
    padding: 3px 10px;
    color: ${COLORS.red};
    font-size: ${FONT_SIZES.small};
    font-weight: 400;
    border-radius: 5px;
    z-index: 1;
  `,
};
