import React from 'react';

import { Shape } from '@components/icons/shape';

import { ITextFieldProps } from './text-field.typings';

import { TextFieldStyled as Styled } from './text-field.styles';

export const TextField: React.FC<ITextFieldProps> = ({
  width,
  isFullWidth,
  value,
  type,
  error,
  height,
  onChange,
  placeholder,
  name,
  onBlur,
  readOnly,
  tabIndex,
  autoCapitalize,
}) => (
  <div>
    <Styled.Wrapper error={error}>
      <Styled.Input
        width={width}
        isFullWidth={isFullWidth}
        error={error}
        height={height}
        type={type}
        value={value}
        onChange={onChange}
        name={name}
        onBlur={onBlur}
        placeholder={placeholder}
        readOnly={readOnly}
        tabIndex={tabIndex}
        autoCapitalize={autoCapitalize}
      />
      {type === 'password' && <Shape />}
      {error && <Styled.ErrorBlock>{error}</Styled.ErrorBlock>}
    </Styled.Wrapper>
  </div>
);
