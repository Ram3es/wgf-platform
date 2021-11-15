import styled, { css } from 'styled-components';

import { COLORS } from '@styles/colors';
import { FONTS } from '@styles/fonts';
import { Media } from '@styles/media';

import { Z_INDEX } from '@constants/z-indexes';

import { ITextFieldStylesProps } from '@components/text-field/text-field.typings';

export const TextAreaStyled = {
  FormItem: styled.div<ITextFieldStylesProps>`
    position: relative;
    margin-bottom: 20px;
    flex: 0 1 100%;

    ${({ label, isLabelTop }) =>
      label &&
      !isLabelTop &&
      css`
        flex: 0 1 70%;
        margin-bottom: 0;
      `}

    ${Media.mobile`
      flex: 0 1 100%;
    `}
  `,
  TextArea: styled.textarea<ITextFieldStylesProps>`
    background: ${COLORS.white};
    border: 1px solid transparent;
    border-radius: 8px;
    box-shadow: 0 0 10px 2px rgb(0 0 0 / 10%);
    padding: 10px 15px;
    font-size: ${FONTS.sizes[14]};
    font-weight: 700;
    font-family: ${FONTS.family.frutigerBold};
    min-width: 100%;
    height: ${({ height }) => height || 'auto'};
    color: ${COLORS.default};
    transition: 0.3s;
    resize: none;
    overflow-y: auto;

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
