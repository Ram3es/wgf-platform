import styled, { css } from 'styled-components';

import { COLORS } from '@styles/colors';
import { FONTS } from '@styles/fonts';

import { IButtonStylesProps } from './button.typings';

export const ButtonStyles = styled.button<IButtonStylesProps>`
  display: ${({ isHide }) => (isHide ? 'none' : 'flex')};
  flex-direction: ${({ isIconRight }) => (isIconRight ? 'row-reverse' : 'row')};
  align-items: center;
  justify-content: center;
  cursor: ${({ isDisabled }) => (isDisabled ? 'not-allowed' : 'pointer')};
  padding: 7px 15px;
  min-width: ${({ isFullWidth, minWidth }) =>
    isFullWidth ? '100%' : minWidth ? `${minWidth}px` : '130px'};
  min-height: ${({ variant }) => (variant === 'text' ? 'auto' : '40px')};
  border-radius: ${({ borderRadius }) => borderRadius || '20px'};
  border: ${({ variant, color }) =>
    `2px solid ${
      variant === 'cancel'
        ? COLORS.grey
        : variant === 'underline'
        ? color
        : 'transparent'
    }`};
  color: ${({ variant, color, textColor }) =>
    variant === 'cancel'
      ? COLORS.grey
      : variant === 'underline'
      ? color
      : textColor
      ? textColor
      : COLORS.white};
  font-size: ${FONTS.sizes[18]};
  font-weight: 700;
  font-family: ${FONTS.family.frutigerBold};
  background-color: ${({ color, variant }) =>
    variant === 'cancel' || variant === 'underline' ? COLORS.white : color};
  transition: 0.3s;
  white-space: nowrap;

  @media print {
    display: none;
  }

  ${({ variant, color }) =>
    variant === 'text' &&
    css`
      padding: 0;
      border-radius: 0;
      color: ${color};
      background-color: transparent;
    `}

  ${({ isDisabled, variant, color }) => {
    if (isDisabled) {
      return;
    }

    switch (variant) {
      case 'text': {
        return css`
          :hover {
            opacity: 0.4;
          }
        `;
      }
      case 'underline': {
        return css`
          :hover {
            background-color: ${color};
            color: ${COLORS.white};
          }
        `;
      }
      default: {
        return css`
          :hover {
            box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.4);
          }
        `;
      }
    }
  }};

  ${({ isDisabled }) =>
    isDisabled &&
    css`
      opacity: 0.6;
    `}

  span {
    padding: 0px 10px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  img {
    width: 8px;
    height: 16px;
  }
`;
