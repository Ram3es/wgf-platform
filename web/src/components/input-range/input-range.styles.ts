import styled, { css } from 'styled-components';

import { COLORS } from '@styles/colors';
import { FONTS } from '@styles/fonts';

import { IStylesInputRangeProps } from './input-range.typings';

const getPositionStyle = (position: number) => {
  if (position > 80) {
    return `transform: translateX(-70%);`;
  }

  if (position > 70 && position < 80) {
    return `transform: translateX(-63%);`;
  }

  if (position > 60 && position < 70) {
    return `transform: translateX(-55%);`;
  }

  if (position > 45 && position < 60) {
    return `transform: translateX(-52%);`;
  }

  if (position < 40 && position > 25) {
    return `transform: translateX(-40%);`;
  }

  if (position < 25 && position > 15) {
    return `transform: translateX(-35%);`;
  }

  if (position < 15) {
    return `transform: translateX(-25%);`;
  }

  return `transform: translateX(-47%);`;
};

const trackCss = css`
  height: 10px;
  background-color: ${COLORS.greyLite};
  border-radius: 5px;
`;

const numberTypeThumbCss = css`
  border-radius: 50%;
  cursor: grab;
  width: 20px;
  height: 20px;
  -webkit-appearance: none;
  margin-top: -5px;
  transition: 0.3s;
  transform: scale(1.1);

  :focus,
  :hover {
    transform: scale(1.25);
  }

  :active {
    cursor: grabbing;
  }
`;

const labelTypeThumbCss = css`
  border-radius: 3px;
  cursor: grab;
  width: 10px;
  height: 28px;
  -webkit-appearance: none;
  margin-top: -9px;
  transition: 0.3s;
  transform: scale(1.1);

  :focus,
  :hover {
    transform: scale(1.25);
  }

  :active {
    cursor: grabbing;
  }
`;

export const InputRangeStyled = {
  Wrapper: styled.div`
    position: relative;
    padding-top: 48px;
    margin-bottom: 10px;
  `,
  Input: styled.input<IStylesInputRangeProps>`
    position: relative;
    width: 100%;
    appearance: none;

    ::-webkit-slider-runnable-track {
      ${trackCss}
    }

    ::-moz-range-track {
      ${trackCss}
    }

    :focus {
      outline: none;
    }

    ::-webkit-slider-thumb {
      background: ${({ color }) => color};
      ${({ variant }) =>
        variant === 'number' ? numberTypeThumbCss : labelTypeThumbCss}
    }

    ::-moz-range-thumb {
      background: ${({ color }) => color};
      ${({ variant }) =>
        variant === 'number' ? numberTypeThumbCss : labelTypeThumbCss}
    }

    ::before {
      position: absolute;
      left: 0;
      content: '';
      display: block;
      height: 10px;
      width: ${({ position }) => `${position}%`};
      background: ${({ color, variant }) =>
        variant === 'number' ? color : 'rgb(136, 130, 129)'};
      border-top-left-radius: 8px;
      border-bottom-left-radius: 8px;
    }
  `,
  NumberLabel: styled.div<{ value: number; color: string; position: number }>`
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    top: 0;
    width: 36px;
    height: 36px;
    border-radius: 50%;
    left: ${({ position }) => `${position}%`};
    background: ${({ color }) => color};
    color: ${COLORS.white};
    font-size: ${FONTS.sizes[15]};

    ${({ position }) => getPositionStyle(position)}

    ::after {
      content: '';
      display: block;
      border-top: 16px solid ${({ color }) => color};
      border-left: 16px solid transparent;
      border-right: 16px solid transparent;
      position: absolute;
      bottom: -7px;
      left: 50%;
      transform: translateX(-50%);
    }
  `,
};
