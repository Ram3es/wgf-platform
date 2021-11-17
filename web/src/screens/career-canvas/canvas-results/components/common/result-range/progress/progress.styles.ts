import styled, { css } from 'styled-components';

interface IProgressProps {
  color: string;
  widthPercent: number;
}

interface IThumbProps {
  top: number;
  size: number;
  color: string;
  leftPercent: number;
}

export const ProgressStyled = {
  Root: styled.div`
    position: relative;
    margin: 6px 0;
  `,
  Bar: styled.div<{ color: string }>`
    height: 6px;
    box-sizing: border-box;
    border: 1px solid ${({ color }) => color};
    border-radius: 4px;
    background-color: #fff;
    box-shadow: inset 0 1px 2px rgb(0 0 0 / 10%);
  `,
  Progress: styled.div<IProgressProps>`
    width: ${({ widthPercent }) => widthPercent}%;
    height: 100%;
    background-color: ${({ color }) => color};
  `,
  Thumb: styled.div<IThumbProps>`
    position: absolute;

    ${({ size }) => css`
      width: ${size}px;
      height: ${size}px;
      line-height: ${size * 0.9}px;
    `}

    top: -${({ top }) => top}px;
    left: ${({ leftPercent }) => `calc(${leftPercent}% - 6px)`};
    background-color: ${({ color }) => color};
    border: 1px solid ${({ color }) => color};

    border-radius: 50%;
    text-align: center;
    color: #fff;
    font-size: 9px;
  `,
};
