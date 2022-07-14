import React from 'react';
import { Icon } from '@components/icon';
import { ITextFieldProps } from '@components/text-field/text-field.typings';
import { InputStyled as Styled } from './input.styles';
import { CheckboxForm } from '@screens/platform-page/components/edit-page/game-info/game-limits-form/checkboxForm';

export const Input: React.FC<ITextFieldProps> = (props) => {
  const {
    error,
    isAutoCompleteOff,
    type,
    label,
    isSelect,
    isReadOnly,
    isTableReadOnly,
    showSelect,
    isShowSelect,
    name,
    setUnlimited,
    value,
  } = props;

  const handleFocus = () => showSelect?.({ [name]: true });

  return (
    <Styled.FormItem error={error} label={label} isSelect={isSelect}>
      <Styled.Input
        {...props}
        readOnly={isReadOnly || isTableReadOnly}
        autoComplete={isAutoCompleteOff ? 'off' : 'on'}
        onFocus={handleFocus}
      />
      {isShowSelect?.[name] && !isReadOnly && !error && (
        <CheckboxForm
          setUnlimited={setUnlimited}
          hideSelect={showSelect}
          name={name}
          value={value}
        />
      )}
      {type === 'password' && <Icon type="shape" />}
      {isSelect && <Icon type="arrowBottom" />}
      {error && <Styled.ErrorBlock>{error}</Styled.ErrorBlock>}
    </Styled.FormItem>
  );
};
