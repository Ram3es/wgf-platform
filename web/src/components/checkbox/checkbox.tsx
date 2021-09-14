import React from 'react';

import { Check } from '@components/icons';

import { ICheckboxProps } from './checkbox.typings';

import { CheckboxStyles } from './checkbox.styles';

export const Checkbox: React.FC<ICheckboxProps> = ({
  onChange,
  isChecked,
  label,
  boxHeight,
  boxWidth,
}) => (
  <CheckboxStyles.Wrapper boxHeight={boxHeight} boxWidth={boxWidth}>
    <CheckboxStyles.RadioItem
      onClick={onChange}
      isChecked={isChecked}
      boxHeight={boxHeight}
      boxWidth={boxWidth}
    >
      {isChecked && <Check />}
    </CheckboxStyles.RadioItem>
    <CheckboxStyles.Label onClick={onChange}>{label}</CheckboxStyles.Label>
  </CheckboxStyles.Wrapper>
);
