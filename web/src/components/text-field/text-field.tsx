import React from 'react';

import { Icon } from '@components/icon';

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
  withBorder,
  onClick,
  isAutoCompleteOff,
}) => (
  <>
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
        withBorder={withBorder}
        onClick={onClick}
        autoComplete={isAutoCompleteOff ? 'off' : 'on'}
      />
      {type === 'password' && <Icon type="shape" />}
      {error && <Styled.ErrorBlock>{error}</Styled.ErrorBlock>}
    </Styled.Wrapper>
  </>
);
