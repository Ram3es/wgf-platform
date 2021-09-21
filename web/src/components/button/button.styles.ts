import styled, { css } from 'styled-components';

import { COLORS } from '@styles/colors';
import { FONT_SIZES } from '@styles/font-sizes';
import { FONTS } from '@styles/fonts';

import { IButtonStylesProps } from './button.typings';

export const ButtonStyles = styled.button<IButtonStylesProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  padding: 7px 15px;
  min-width: ${({ isFullWidth, minWidth }) =>
    isFullWidth ? '100%' : minWidth ? `${minWidth}px` : '130px'};
  min-height: ${({ variant }) => (variant === 'text' ? 'auto' : '40px')};
  border-radius: 20px;
  border: ${({ variant }) =>
    `1px solid ${variant === 'cancel' ? COLORS.grey : 'transparent'}`};
  color: ${({ variant }) =>
    variant === 'cancel' ? COLORS.grey : COLORS.white};
  font-size: ${FONT_SIZES.default};
  font-weight: 700;
  font-family: ${FONTS.frutigerBold};
  background-color: ${({ color, variant }) =>
    variant === 'cancel' ? COLORS.white : color};
  transition: 0.3;
  white-space: nowrap;

  ${({ variant, color }) =>
    variant === 'text' &&
    css`
      padding: 0;
      border-radius: 0;
      color: ${color};
      background-color: transparent;
    `}

  ${({ isDisabled, variant }) => {
    if (!isDisabled && variant !== 'text') {
      return `
        :hover {
          box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.4);
        }
      `;
    }

    if (variant === 'text') {
      return `
        :hover {
            opacity: 0.4;
          }
      `;
    }

    return `
        cursor: not-allowed;
        opacity: 0.4;

        :hover {
          opacity: 0.4;
        }
      `;
  }};

  span {
    padding: 0 10px;
  }

  img {
    width: 8px;
    height: 16px;
  }
`;
