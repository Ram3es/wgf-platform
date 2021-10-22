import React from 'react';

import { Icon } from '@components/icon';

import { ITextFieldProps } from '@components/text-field/text-field.typings';

import { InputStyled as Styled } from './input.styles';

export const Input: React.FC<ITextFieldProps> = (props) => {
  const { error, isAutoCompleteOff, type, label, isSelect } = props;
  return (
    <Styled.FormItem error={error} label={label} isSelect={isSelect}>
      <Styled.Input
        {...props}
        autoComplete={isAutoCompleteOff ? 'off' : 'on'}
      />
      {type === 'password' && <Icon type="shape" />}
      {isSelect && <Icon type="arrowBottom" />}
      {error && <Styled.ErrorBlock>{error}</Styled.ErrorBlock>}
    </Styled.FormItem>
  );
};
