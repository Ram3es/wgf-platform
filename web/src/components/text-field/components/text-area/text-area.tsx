import React from 'react';

import { ITextFieldProps } from '@components/text-field/text-field.typings';

import { TextAreaStyled as Styled } from './text-area.styles';

export const TextArea: React.FC<ITextFieldProps> = (props) => {
  const { error, isAutoCompleteOff, label, isSelect, isLabelTop } = props;
  return (
    <Styled.FormItem
      error={error}
      label={label}
      isSelect={isSelect}
      isLabelTop={isLabelTop}
    >
      <Styled.TextArea
        {...props}
        autoComplete={isAutoCompleteOff ? 'off' : 'on'}
      />
      {error && <Styled.ErrorBlock>{error}</Styled.ErrorBlock>}
    </Styled.FormItem>
  );
};
