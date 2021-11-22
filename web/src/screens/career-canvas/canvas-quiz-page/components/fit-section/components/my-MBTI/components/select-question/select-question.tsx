import React, { FC, useState } from 'react';

import { DropDown } from '@components/drop-down';
import { TextField } from '@components/text-field';

import { ISelectQuestion } from './select-question.typings';

import { SelectQuestionStyled as Styled } from './select-question.styles';

export const SelectQuestion: FC<ISelectQuestion> = (props) => {
  const { id, options, value, onChangeAnswer } = props;
  const [isActiveDropdown, setIsActiveDropdown] = useState(false);
  const openDropdown = () => setIsActiveDropdown(true);

  const handleChange = (value: string) => {
    onChangeAnswer(id, value);
  };

  return (
    <Styled.FormWrapper>
      <TextField
        type="text"
        name="myMBTI"
        value={value}
        withBorder
        height="38px"
        onClick={openDropdown}
        isAutoCompleteOff
        isSelect
        readOnly
      />
      {isActiveDropdown && (
        <Styled.SelectWrapper>
          <DropDown
            isFullWidth
            options={options}
            selected={value}
            setSelected={handleChange}
            setIsActive={setIsActiveDropdown}
          />
        </Styled.SelectWrapper>
      )}
    </Styled.FormWrapper>
  );
};
