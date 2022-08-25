import React, { FC } from 'react';
import { InputModalStyles as Styled } from './input-modal.styles';
import { IInputModalProps } from './input.typing';
import { Checkbox } from '@components/checkbox';

export const InputModal: FC<IInputModalProps> = ({
  references,
  onChange,
  isChecked,
}) => {
  return (
    <Styled.Select ref={references}>
      <Styled.CheckboxWrapper>
        <Checkbox
          onChange={onChange as any}
          label="Unlimited"
          isChecked={isChecked}
          isMonoColor
          boxWidth={16}
          boxHeight={16}
          alignItems="center"
          noMargin
        />
      </Styled.CheckboxWrapper>
    </Styled.Select>
  );
};
