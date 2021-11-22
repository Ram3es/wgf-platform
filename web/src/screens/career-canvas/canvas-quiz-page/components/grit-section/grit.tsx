import React, { ChangeEvent, FC } from 'react';

import { Button } from '@components/button';
import { InputRange } from '@components/input-range';
import { Loader } from '@components/loader';
import { COLORS } from '@styles/colors';

import { PROMISES_AREA } from '@constants/promises-area';
import { QUESTION_SECTIONS } from '../../canvas-quiz-page.constants';

import { IGritProps } from './grit.typings';

import { TitleStyles } from '@styles/components/title-styles';
import { HeaderSectionStyled } from '../header-section.styles';
import { GritStyled as Styled } from './grit.styles';

export const Grit: FC<IGritProps> = (props) => {
  const { questionListForSection, onSubmitSection, onChangeAnswer } = props;

  const handleChange =
    (id: string) => (event: ChangeEvent<HTMLInputElement>) => {
      onChangeAnswer(id, event.target.value);
    };

  return (
    <div>
      <HeaderSectionStyled.TitleWrapper>
        <h1>My PERFORMANCE CHARACTER</h1>
        <HeaderSectionStyled.SectionLogo>GRIT</HeaderSectionStyled.SectionLogo>
      </HeaderSectionStyled.TitleWrapper>
      <Styled.DescriptionWrapper>
        <strong>
          The strength of my character traits that can magnify my success
        </strong>
        <p>
          Rate yourself from 1 (I have none of this) to 10 (I am filled with
          this)
        </p>
      </Styled.DescriptionWrapper>
      {questionListForSection
        .sort((first, second) => first.order - second.order)
        .map((question) => (
          <div key={question.id}>
            <Styled.Title>
              <TitleStyles.h3 color={question.color} textAlign="left">
                {question.title}
              </TitleStyles.h3>
            </Styled.Title>
            <InputRange
              onChange={handleChange(question.id)}
              minRange={1}
              maxRange={10}
              value={+question.answers[0]?.value || 5}
              color={question.color || COLORS.blue}
              variant="number"
            />
          </div>
        ))}
      <Styled.Control>
        <Loader area={PROMISES_AREA.sendCanvasAnswers}>
          <Button
            title="Save & Next Section"
            borderRadius="8px"
            color={QUESTION_SECTIONS.GRIT.color}
            onClick={onSubmitSection}
          />
        </Loader>
      </Styled.Control>
    </div>
  );
};
