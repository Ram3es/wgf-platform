import React from 'react';

import { Icon } from '@components/icon';

import { ICheckboxProps } from './checkbox.typings';

import { CheckboxStyles as Styled } from './checkbox.styles';

export const Checkbox: React.FC<ICheckboxProps> = ({
  onChange,
  isChecked,
  label,
  boxHeight,
  boxWidth,
  alignItems,
}) => (
  <Styled.Wrapper
    boxHeight={boxHeight}
    boxWidth={boxWidth}
    alignItems={alignItems}
  >
    <Styled.RadioItem
      onClick={onChange}
      isChecked={isChecked}
      boxHeight={boxHeight}
      boxWidth={boxWidth}
    >
      {isChecked && <Icon type="check" />}
    </Styled.RadioItem>
    <Styled.Label onClick={onChange}>{label}</Styled.Label>
  </Styled.Wrapper>
);
