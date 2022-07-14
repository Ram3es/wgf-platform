import React from 'react';

import { Input } from './components/input';
import { TextArea } from './components/text-area';

import { ITextFieldProps } from './text-field.typings';

import { TextFieldStyled as Styled } from './text-field.styles';

export const TextField: React.FC<ITextFieldProps> = (props) => {
  const {
    isSelect,
    label,
    value,
    isReadOnly,
    error,
    isLabelTop,
    variant = 'input',
    labelFontSize,
    colorGrey,
  } = props;

  if (!label) {
    return variant === 'input' ? <Input {...props} /> : <TextArea {...props} />;
  }

  return (
    <Styled.Wrapper isSelect={isSelect}>
      <Styled.Label
        isValue={!!value}
        isReadOnly={isReadOnly}
        error={error}
        isLabelTop={isLabelTop}
        labelFontSize={labelFontSize}
        colorGrey={colorGrey}
      >
        <span>{label}</span>
        {variant === 'input' ? <Input {...props} /> : <TextArea {...props} />}
      </Styled.Label>
    </Styled.Wrapper>
  );
};
