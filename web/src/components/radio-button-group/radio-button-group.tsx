import React, { useState } from 'react';

import { Check } from '@components/icons';

import { IRadioButtonProps } from './radio-button-group.typings';

import { RadioButtonGroupStyles } from './radio-button-group.styles';

export const RadioButtonGroup: React.FC<IRadioButtonProps> = ({
  onChange,
  radioGroup,
  isImage,
  isVariantQuiz,
  radioWidth,
  radioHeight,
  containerWidth,
  initValue,
}) => {
  const [radioValue, setRadioValue] = useState(initValue || '');

  const changeHandler = (value: string | number) => () => {
    setRadioValue(value);
    onChange(value);
  };

  return (
    <>
      {radioGroup.map(({ value, label, color }, i) => (
        <RadioButtonGroupStyles.Wrapper
          isVariantQuiz={isVariantQuiz}
          key={i}
          containerWidth={containerWidth}
        >
          <RadioButtonGroupStyles.RadioItem
            color={color}
            onClick={changeHandler(value)}
            radioWidth={radioWidth}
            radioHeight={radioHeight}
            isVariantQuiz={isVariantQuiz}
            checked={radioValue === value}
          >
            {isImage && radioValue === value && <Check />}
          </RadioButtonGroupStyles.RadioItem>
          <RadioButtonGroupStyles.Label
            color={color}
            onClick={changeHandler(value)}
            isVariantQuiz={isVariantQuiz}
          >
            {label}
          </RadioButtonGroupStyles.Label>
        </RadioButtonGroupStyles.Wrapper>
      ))}
    </>
  );
};
