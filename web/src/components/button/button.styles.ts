import styled from 'styled-components';

import { COLORS } from '@styles/colors';
import { FONT_SIZES } from '@styles/font-sizes';

import { IButtonStylesProps } from './button.typings';

export const ButtonStyles = styled.button<IButtonStylesProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  padding: 7px 15px;
  min-width: ${({ isFullWidth }) => (isFullWidth ? '100%' : '130px')};
  min-height: 40px;
  border-radius: 20px;
  border: 0;
  color: ${COLORS.white};
  font-size: ${FONT_SIZES.default};
  font-family: 'FrutigerLTStd-Bold';
  font-weight: 700;
  background-color: ${({ color }) => color};
  ${({ variant }) => variant === 'secondary' && `opacity: 0.7`};
  transition: 0.3;
  white-space: nowrap;

  ${({ isDisabled }) => {
    if (!isDisabled) {
      return `
        :hover {
          box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.4);
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
