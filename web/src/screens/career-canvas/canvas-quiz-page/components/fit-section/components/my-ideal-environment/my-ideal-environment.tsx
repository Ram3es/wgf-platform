import React, { ChangeEvent, FC } from 'react';

import { TextField } from '@components/text-field';
import { FONTS } from '@styles/fonts';

import { IPropsMyIdealEnvironment } from './my-ideal-environment.typings';

export const MyIdealEnvironment: FC<IPropsMyIdealEnvironment> = (props) => {
  const { questionList, onChangeAnswer } = props;

  const onChangeTextField =
    (id: string) => (event: ChangeEvent<HTMLTextAreaElement>) => {
      onChangeAnswer(id, event.target.value);
    };

  return (
    <>
      {questionList.map((question) => (
        <TextField
          variant="textarea"
          onChange={onChangeTextField(question.id)}
          value={question.answers[0]?.value || ''}
          type="text"
          name="text"
          height="150px"
          label={question.title || ''}
          placeholder={question.placeholder || ''}
          isLabelTop
          labelFontSize={FONTS.sizes[18]}
          key={question.id}
        />
      ))}
    </>
  );
};
