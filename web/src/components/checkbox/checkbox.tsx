import React from 'react';

import { Check } from '@components/icons';

import { ICheckboxProps } from './checkbox.typings';

import { CheckboxStyles } from './checkbox.styles';

export const Checkbox: React.FC<ICheckboxProps> = ({
  onChange,
  isChecked,
  label,
}) => (
  <CheckboxStyles.Wrapper>
    <CheckboxStyles.RadioItem onClick={onChange} checked={isChecked}>
      {isChecked && <Check />}
    </CheckboxStyles.RadioItem>
    <CheckboxStyles.Label onClick={onChange}>{label}</CheckboxStyles.Label>
  </CheckboxStyles.Wrapper>
);
