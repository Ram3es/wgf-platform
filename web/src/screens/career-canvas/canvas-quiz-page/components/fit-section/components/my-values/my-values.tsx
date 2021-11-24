import React, { ChangeEvent, FC } from 'react';

import { MultiSelect } from '@components/select';
import { TextField } from '@components/text-field';
import { FONTS } from '@styles/fonts';

import { ISelectOption } from '@components/select/select.typings';
import { IPropsMyValues } from './my-values.typings';

export const MyValues: FC<IPropsMyValues> = (props) => {
  const { questionList, onChangeAnswer } = props;

  const multiSelectQuestion = questionList.find(
    (question) => question.type === 'options'
  );

  const textareaQuestion = questionList.find(
    (question) => question.type === 'single'
  );

  const options = multiSelectQuestion?.answerOptions
    ?.sort((first, second) =>
      first.text > second.text ? 1 : first.text === second.text ? 0 : -1
    )
    .map((item) => ({
      label: item.text,
      value: item.text,
    }));

  const onChangeTextField = (event: ChangeEvent<HTMLTextAreaElement>) => {
    onChangeAnswer(textareaQuestion?.id || '', event.target.value);
  };

  const handleMultiSelectChange = (selected: ISelectOption[]) => {
    const answerString = selected.map((item) => item.value).join('/');
    onChangeAnswer(multiSelectQuestion?.id || '', answerString);
  };

  const selected = () => {
    const selectedValue = multiSelectQuestion?.answers[0]?.value;

    if (!selectedValue) {
      return [];
    }

    return selectedValue.split('/').map((item) => ({
      value: item,
      label: item,
    }));
  };

  return (
    <>
      <TextField
        variant="textarea"
        onChange={onChangeTextField}
        value={textareaQuestion?.answers[0]?.value || ''}
        type="text"
        name="text"
        height="150px"
        label={textareaQuestion?.title || ''}
        placeholder={textareaQuestion?.placeholder || ''}
        isLabelTop
        labelFontSize={FONTS.sizes[18]}
      />
      <MultiSelect
        options={options || []}
        selected={selected()}
        setSelected={handleMultiSelectChange}
        maxSelected={4}
        placeholder={multiSelectQuestion?.placeholder || ''}
        label={multiSelectQuestion?.title || ''}
      />
    </>
  );
};
