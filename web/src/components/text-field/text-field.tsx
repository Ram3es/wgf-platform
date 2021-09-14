import React from 'react';

import { Shape } from '@components/icons/shape';

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
  autoCapitalize,
}) => (
  <div>
    <TextFieldStyled.Wrapper error={error}>
      <TextFieldStyled.Input
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
      {error && (
        <TextFieldStyled.ErrorBlock>{error}</TextFieldStyled.ErrorBlock>
      )}
    </TextFieldStyled.Wrapper>
  </div>
);
