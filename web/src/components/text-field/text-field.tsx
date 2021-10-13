import React from 'react';

import { Icon } from '@components/icon';

import { ITextFieldProps } from './text-field.typings';

import { TextFieldStyled as Styled } from './text-field.styles';

export const TextField: React.FC<ITextFieldProps> = (props) => {
  const { type, error, isAutoCompleteOff } = props;

  return (
    <>
      <Styled.Wrapper error={error}>
        <Styled.Input
          {...props}
          autoComplete={isAutoCompleteOff ? 'off' : 'on'}
        />
        {type === 'password' && <Icon type="shape" />}
        {error && <Styled.ErrorBlock>{error}</Styled.ErrorBlock>}
      </Styled.Wrapper>
    </>
  );
};
