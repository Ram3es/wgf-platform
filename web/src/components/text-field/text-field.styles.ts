import styled, { css } from 'styled-components';

import { COLORS } from '@styles/colors';
import { FONTS } from '@styles/fonts';
import { Media } from '@styles/media';

import { ITextFieldStylesProps } from './text-field.typings';

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
    cursor: ${({ isReadOnly }) => (isReadOnly ? 'text' : 'pointer')};

    span {
      flex: 0 1 30%;
      margin-right: 20px;
      font-size: ${FONTS.sizes[15]};
      color: ${({ isValue, isReadOnly, error }) =>
        isValue && !isReadOnly && !error
          ? COLORS.default
          : error
          ? COLORS.red
          : COLORS.grey};
    }

    ${Media.mobile`
      flex-wrap: wrap;
      
      span {
        flex: 0 1 100%;
        margin-bottom: 5px;
      }
    `}
  `,
};
