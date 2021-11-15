import React, { FC } from 'react';

import { IInputRangeProps } from './input-range.typings';

import { InputRangeStyled as Styled } from './input-range.styles';

export const InputRange: FC<IInputRangeProps> = (props) => {
  const { color, maxRange, minRange, onChange, value, variant } = props;

  const position = ((value - minRange) / (maxRange - minRange)) * 100;

  return (
    <Styled.Wrapper>
      <Styled.Input
        type="range"
        min={minRange}
        max={maxRange}
        step="1"
        position={position}
        value={value}
        onChange={onChange}
        color={color}
        variant={variant}
      />
      {variant === 'number' && (
        <Styled.NumberLabel value={value} position={position} color={color}>
          {value}
        </Styled.NumberLabel>
      )}
    </Styled.Wrapper>
  );
};
