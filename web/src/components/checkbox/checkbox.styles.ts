import styled, { css } from 'styled-components';

import { COLORS } from '@styles/colors';

import { ICheckboxStyles } from './checkbox.typings';

export const CheckboxStyles = {
  Wrapper: styled.div<ICheckboxStyles>`
    display: flex;
    align-items: ${({ alignItems }) => alignItems || 'flex-start'};
    margin-bottom: ${({ noMargin }) => (noMargin ? '0' : '20px')};

    svg {
      width: ${({ boxWidth }) => (boxWidth ? `${boxWidth - 6}px` : '16px')};
      height: ${({ boxHeight }) => (boxHeight ? `${boxHeight - 8}px` : '14px')};

      ${({ isMonoColor }) =>
        isMonoColor &&
        css`
          path {
            fill: ${COLORS.grey};
          }
        `}
    }
  `,
  RadioItem: styled.div<ICheckboxStyles>`
    display: flex;
    align-items: center;
    justify-content: center;
    min-width: ${({ boxWidth }) => (boxWidth ? `${boxWidth}px` : '24px')};
    height: ${({ boxHeight }) => (boxHeight ? `${boxHeight}px` : '24px')};
    cursor: pointer;
    border-radius: 4px;
    margin-right: 10px;
    border: 1px solid
      ${({ isChecked, isMonoColor }) =>
        isChecked && !isMonoColor
          ? COLORS.greenLight
          : isMonoColor
          ? COLORS.grey
          : COLORS.default};
    background-color: ${({ isChecked, isMonoColor }) =>
      isChecked && !isMonoColor ? COLORS.greenLight : COLORS.white};
  `,

  Label: styled.span`
    cursor: pointer;
    color: ${COLORS.default};
  `,
};
