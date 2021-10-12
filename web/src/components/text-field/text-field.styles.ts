import styled, { css } from 'styled-components';

import { COLORS } from '@styles/colors';
import { FONTS } from '@styles/fonts';
import { Media } from '@styles/media';

import { Z_INDEX } from '@constants/z-indexes';

import { ITextFieldStylesProps } from './text-field.typings';

export const TextFieldStyled = {
  Wrapper: styled.div<{ error?: string }>`
    position: relative;
    margin-bottom: 30px;

    svg {
      position: absolute;
      left: 13px;
      top: 50%;
      transform: translateY(-50%);

      path {
        fill: ${({ error }) => (error ? COLORS.red : COLORS.grey)};
      }
    }
  `,

  Input: styled.input<ITextFieldStylesProps>`
    background: ${COLORS.white};
    border: 1px solid
      ${({ withBorder }) => (withBorder ? COLORS.black : 'transparent')};
    border-radius: 7.5px;
    font-size: ${FONTS.sizes[14]};
    font-weight: 700;
    font-family: ${FONTS.family.frutigerBold};
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
      css`
        border: 1px solid ${COLORS.red};
        color: ${COLORS.red};
      `}

    ${({ readOnly }) =>
      readOnly &&
      css`
        border: 1px solid ${COLORS.grey};
        color: ${COLORS.grey};
      `}

    ${Media.mobile(css`
      font-size: ${FONTS.sizes[16]};
    `)};

    :hover,
    :focus,
    :focus-visible {
      outline: none;
      -webkit-outline: none;

      ${({ readOnly, error }) =>
        !readOnly &&
        css`
          box-shadow: 0px 6px 17px rgba(0, 0, 0, 0.2);
          -webkit-box-shadow: 0px 6px 17px rgba(0, 0, 0, 0.2);
          ${error &&
          css`
            box-shadow: 0px 4px 15px rgba(223, 0, 3, 0.2);
            -webkit-box-shadow: 0px 4px 15px rgba(223, 0, 3, 0.2);
          `}
        `}
    }

    ::placeholder {
      color: ${({ error }) => (error ? COLORS.red : COLORS.grey)};
      font-weight: 400;
      font-family: ${FONTS.family.frutigerNormal};
    }
  `,

  ErrorBlock: styled.div`
    position: absolute;
    padding: 3px 0;
    color: ${COLORS.red};
    font-size: ${FONTS.sizes[12]};
    font-weight: 400;
    border-radius: 5px;
    z-index: ${Z_INDEX.low};
  `,
};
