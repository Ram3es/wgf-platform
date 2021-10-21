import React from 'react';

import { Icon } from '@components/icon';
import { Input } from './components/input';

import { ITextFieldProps } from './text-field.typings';

import { TextFieldStyled as Styled } from './text-field.styles';

export const TextField: React.FC<ITextFieldProps> = (props) => {
  const { isSelect, label, value, readOnly } = props;

  if (!label) {
    return <Input {...props} />;
  }

  return (
    <Styled.Wrapper isSelect={isSelect}>
      <Styled.Label isValue={!!value} isReadOnly={readOnly}>
        <span>{label}</span>
        <Input {...props} />
      </Styled.Label>
      {isSelect && <Icon type="arrowBottom" />}
    </Styled.Wrapper>
  );
};
