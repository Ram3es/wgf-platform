import React from 'react';

import { Input } from './components/input';

import { ITextFieldProps } from './text-field.typings';

import { TextFieldStyled as Styled } from './text-field.styles';

export const TextField: React.FC<ITextFieldProps> = (props) => {
  const { isSelect, label, value, readOnly, error } = props;

  if (!label) {
    return <Input {...props} />;
  }

  return (
    <Styled.Wrapper isSelect={isSelect}>
      <Styled.Label isValue={!!value} isReadOnly={readOnly} error={error}>
        <span>{label}</span>
        <Input {...props} />
      </Styled.Label>
    </Styled.Wrapper>
  );
};
