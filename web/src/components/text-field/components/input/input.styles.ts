import styled, { css } from 'styled-components';

import { COLORS } from '@styles/colors';
import { FONTS } from '@styles/fonts';
import { Media } from '@styles/media';
import { Z_INDEX } from '@styles/z-indexes';

import { ITextFieldStylesProps } from '@components/text-field/text-field.typings';

export const InputStyled = {
  FormItem: styled.div<ITextFieldStylesProps>`
    position: relative;
    margin-bottom: 20px;

    ${({ label }) =>
      label &&
      css`
        flex: 0 1 70%;
        margin-bottom: 0;
      `}

    ${Media.mobile`
      flex: 0 1 100%;
    `}

      svg {
      position: absolute;
      top: 50%;
      transform: translateY(-50%);

      ${({ isSelect, error }) =>
        isSelect
          ? css`
              right: 13px;
            `
          : css`
              left: 13px;

              path {
                fill: ${error ? COLORS.red : COLORS.grey};
              }
            `}
    }
  `,

  Input: styled.input<ITextFieldStylesProps>`
    background: ${COLORS.white};
    border: 1px solid
      ${({ withBorder, value }) =>
        withBorder ? (value ? COLORS.default : COLORS.grey) : 'transparent'};
    border-radius: 7.5px;
    font-size: ${FONTS.sizes[14]};
    font-weight: 700;
    font-family: ${FONTS.family.frutigerBold};
    width: 100%;
    height: ${({ height }) => height || 'auto'};
    color: ${({ isEditMode }) => (isEditMode ? COLORS.grey : COLORS.default)};
    transition: 0.3s;
    box-shadow: 1.8px 5.4px 14.4px rgba(45, 45, 55, 0.1);
    padding: ${({ type }) =>
      type === 'password' ? '13px 13px 13px 37px' : '13px 28px 13px 13px'};
    cursor: ${({ isSelect }) => (isSelect ? 'pointer' : 'text')};

    :-webkit-autofill,
    :-webkit-autofill:hover,
    :-webkit-autofill:focus,
    :-webkit-autofill:active,
    :-webkit-autofill {
      box-shadow: 0 0 0 30px ${COLORS.white} inset !important;
      border-color: ${({ isTableReadOnly }) => isTableReadOnly && COLORS.white};
    }

    ${({ error }) =>
      error &&
      css`
        border: 1px solid ${COLORS.red};
        color: ${COLORS.red};
      `}

    ${({ isReadOnly, isSelect, isEditMode }) =>
      isReadOnly &&
      !isSelect &&
      css`
        border: 1px solid ${COLORS.grey};
        color: ${COLORS.grey};
        ${!isEditMode &&
        css`
          border: none;
          outline: none;
        `}
      `}

    ${Media.mobile(css`
      font-size: ${FONTS.sizes[16]};
    `)};

    :hover,
    :focus,
    :focus-visible {
      outline: none;

      ${({ isReadOnly, error, isSelect, isTableReadOnly }) =>
        !isReadOnly &&
        !isSelect &&
        !isTableReadOnly &&
        css`
          box-shadow: 0px 6px 17px rgba(0, 0, 0, 0.2);
          ${error &&
          css`
            box-shadow: 0px 4px 15px rgba(223, 0, 3, 0.2);
          `}
        `}
    }

    ::placeholder {
      color: ${({ error }) => (error ? COLORS.red : COLORS.grey)};
      font-weight: 400;
      font-family: ${FONTS.family.frutigerNormal};
    }

    ${({ isTableReadOnly, error }) =>
      isTableReadOnly &&
      !error &&
      css`
        outline: none;
        border-color: transparent;
        color: ${COLORS.default};
        box-shadow: none;
        font-family: ${FONTS.family.frutigerNormal};
        font-weight: 400;
        background-color: transparent;
      `}
  `,

  ErrorBlock: styled.div`
    position: absolute;
    top: 100%;
    padding: 3px 0;
    color: ${COLORS.red};
    font-size: ${FONTS.sizes[12]};
    font-weight: 400;
    border-radius: 5px;
    z-index: ${Z_INDEX.low};
  `,
};
