import React, { useState } from 'react';

import { Icon } from '@components/icon';

import { IRadioButtonProps } from './radio-button-group.typings';

import { RadioButtonGroupStyles as Styled } from './radio-button-group.styles';

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
        <Styled.Wrapper
          isVariantQuiz={isVariantQuiz}
          key={i}
          containerWidth={containerWidth}
        >
          <Styled.RadioItem
            color={color}
            onClick={changeHandler(value)}
            radioWidth={radioWidth}
            radioHeight={radioHeight}
            isVariantQuiz={isVariantQuiz}
            checked={radioValue === value}
          >
            {isImage && radioValue === value && <Icon type="check" />}
          </Styled.RadioItem>
          <Styled.Label
            color={color}
            onClick={changeHandler(value)}
            isVariantQuiz={isVariantQuiz}
          >
            {label}
          </Styled.Label>
        </Styled.Wrapper>
      ))}
    </>
  );
};
