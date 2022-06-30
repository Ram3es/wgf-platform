import styled, { css } from 'styled-components';

import { COLORS } from '@styles/colors';
import { FONTS } from '@styles/fonts';
import { Media } from '@styles/media';

import { ITextFieldStylesProps } from './text-field.typings';

const labelToTopCss = css`
  flex-wrap: wrap;

  span {
    flex: 0 1 100%;
    margin-bottom: 5px;
  }
`;

export const TextFieldStyled = {
  Wrapper: styled.div<{ isSelect?: boolean }>`
    position: relative;

    ${({ isSelect }) =>
      isSelect &&
      css`
        svg {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          right: 15px;
        }
      `}
  `,
  Label: styled.label<ITextFieldStylesProps>`
    width: 100%;
    display: flex;
    align-items: center;
    margin-bottom: 20px;
    cursor: ${({ isReadOnly, isSelect }) =>
      isReadOnly && !isSelect ? 'text' : 'pointer'};

    span {
      flex: 0 1 30%;
      margin-right: 20px;
      font-size: ${({ labelFontSize }) => labelFontSize || FONTS.sizes[15]};
      color: ${({ isValue, isSelect, isReadOnly, error }) =>
        (isValue && isSelect) || !isReadOnly
          ? COLORS.default
          : error
          ? COLORS.red
          : COLORS.grey};
    }

    ${({ isLabelTop }) => isLabelTop && labelToTopCss}

    ${Media.mobile(css`
      ${labelToTopCss}
    `)}
  `,
};
