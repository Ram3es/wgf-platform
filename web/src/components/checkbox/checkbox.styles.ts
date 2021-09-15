import styled from 'styled-components';

import { COLORS } from '@styles/colors';

import { ICheckboxStyles } from './checkbox.typings';

export const CheckboxStyles = {
  Wrapper: styled.div<ICheckboxStyles>`
    display: flex;
    align-items: center;
    margin-bottom: 20px;

    svg {
      width: ${({ boxWidth }) => (boxWidth ? `${boxWidth - 6}px` : '24px')};
      height: ${({ boxHeight }) => (boxHeight ? `${boxHeight - 8}px` : '24px')};
    }
  `,
  RadioItem: styled.div<ICheckboxStyles>`
    display: flex;
    align-items: center;
    justify-content: center;
    width: ${({ boxWidth }) => (boxWidth ? `${boxWidth}px` : '24px')};
    height: ${({ boxHeight }) => (boxHeight ? `${boxHeight}px` : '24px')};
    cursor: pointer;
    border-radius: 4px;
    margin-right: 10px;
    border: 1px solid
      ${({ isChecked }) => (isChecked ? COLORS.greenLite : COLORS.default)};
    ${({ isChecked }) => isChecked && `background-color: ${COLORS.greenLite};`}
  `,

  Label: styled.span`
    cursor: pointer;
    color: ${COLORS.default};
  `,
};
