import styled from 'styled-components';

import { COLORS } from '@styles/colors';
import { FONT_SIZES } from '@styles/font-sizes';

import { ICheckboxStyles } from './checkbox.typings';

export const CheckboxStyles = {
  Wrapper: styled.div`
    display: flex;
    margin-bottom: 20px;
  `,
  RadioItem: styled.div<ICheckboxStyles>`
    display: flex;
    align-items: center;
    justify-content: center;
    min-width: 24px;
    height: 24px;
    cursor: pointer;
    border-radius: 4px;
    margin-right: 10px;
    border: 1px solid
      ${({ checked }) => (checked ? COLORS.greenLite : COLORS.default)};
    ${({ checked }) => checked && `background-color: ${COLORS.greenLite};`}
  `,

  Label: styled.span`
    cursor: pointer;
    font-size: ${FONT_SIZES.default};
    color: ${COLORS.default};
  `,
};
