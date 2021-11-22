import React, { ChangeEvent, FC } from 'react';

import { Button } from '@components/button';
import { Loader } from '@components/loader';
import { TextField } from '@components/text-field';
import { FONTS } from '@styles/fonts';

import { PROMISES_AREA } from '@constants/promises-area';
import { QUESTION_SECTIONS } from '../../canvas-quiz-page.constants';

import { IPracticalityCheckProps } from './practicality-check-section.typings';

import { HeaderSectionStyled } from '../header-section.styles';
import { PracticalityCheckStyled as Styled } from './practicality-check.styles';

export const PracticalityCheck: FC<IPracticalityCheckProps> = (props) => {
  const { onChangeAnswer, onSubmitSection, questionListForSection } = props;

  const onChangeTextField =
    (id: string) => (event: ChangeEvent<HTMLTextAreaElement>) => {
      onChangeAnswer(id, event.target.value);
    };

  return (
    <div>
      <HeaderSectionStyled.TitleWrapper>
        <h1>PRACTICALITY CHECK</h1>
      </HeaderSectionStyled.TitleWrapper>
      {questionListForSection.map((question) => (
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
      <Styled.Control>
        <Loader area={PROMISES_AREA.sendCanvasAnswers}>
          <Button
            title="Save & Next Section"
            borderRadius="8px"
            color={QUESTION_SECTIONS['PRACTICALITY CHECK'].color}
            onClick={onSubmitSection}
          />
        </Loader>
      </Styled.Control>
    </div>
  );
};
