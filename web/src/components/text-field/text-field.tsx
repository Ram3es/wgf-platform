import React from 'react';

import { ITextFieldProps } from './text-field.typings';

import { TextFieldStyled } from './text-field.styles';

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
}) => (
  <div>
    <TextFieldStyled.Wrapper
      width={width}
      isFullWidth={isFullWidth}
      error={error}
      height={height}
      placeholder={placeholder}
    >
      <input
        type={type}
        value={value}
        onChange={onChange}
        name={name}
        onBlur={onBlur}
        placeholder={placeholder}
        readOnly={readOnly}
        tabIndex={tabIndex}
      />
      {error && (
        <TextFieldStyled.ErrorBlock>{error}</TextFieldStyled.ErrorBlock>
      )}
    </TextFieldStyled.Wrapper>
  </div>
);
