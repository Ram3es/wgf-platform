import styled, { css } from 'styled-components';

import { COLORS } from '@styles/colors';
import { FONTS } from '@styles/fonts';
import { Media } from '@styles/media';

import { IProgressBarProps } from './progress-bar.typings';

export const ProgressBarStyles = {
  Wrapper: styled.div`
    padding: 40px 0;
    position: sticky;
    top: 0;
    background-color: ${COLORS.white};

    ${Media.mobile`
      padding: 20px 0;
    `}
  `,
  Range: styled.div`
    position: relative;
    height: 12px;
    border: 1px solid ${COLORS.grey};
    border-radius: 6px;
    background-color: ${COLORS.white};
    ${Media.mobile`
    height: 10px;
    `}
  `,

  Line: styled.div<IProgressBarProps>`
    position: absolute;
    height: 12px;
    background: ${COLORS.greenLite};
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.25);
    border: 1px solid ${COLORS.greenLite};
    border-radius: 6px;
    top: -1px;
    left: -2px;
    width: calc(${({ percent }) => percent + '%'} + 4px);
    transition: 0.3s;
    ${Media.mobile`
    height: 10px;
    `}
  `,

  Indicator: styled.div<IProgressBarProps>`
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    ${({ percent }) => {
      if (+percent < 25) {
        return `
          top: 50%;
          transform: translateY(-50%);
          left: calc(100% - 4px);
        `;
      }
      if (+percent > 75) {
        return `
          top: 50%;
          transform: translateY(-50%);
          right: -2px;
        `;
      }
      return `
        top: 50%;
        right: 0;
        transform: translate(50%, -50%);
      `;
    }};
    min-width: 50px;
    min-height: 50px;
    background: ${COLORS.greenLite};
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.25);
    border-radius: 50%;

    ${Media.mobile`
      min-width: 40px;
      min-height: 40px;
    `}

    span {
      color: ${COLORS.white};
      font-size: ${FONTS.sizes[14]};
      font-weight: 900;
      line-height: 17px;
      font-family: ${FONTS.family.frutigerBold};

      ${Media.mobile(css`
        font-size: ${FONTS.sizes[12]};
      `)}
    }
  `,
};
