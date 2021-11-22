import React, { ChangeEvent, FC, useMemo } from 'react';

import { Button } from '@components/button';
import { InfoBlock } from '@components/info-block';
import { Loader } from '@components/loader';
import { TextField } from '@components/text-field';
import { FONTS } from '@styles/fonts';
import { SelectQuestion } from '../fit-section/components/my-MBTI/components/select-question';

import { PROMISES_AREA } from '@constants/promises-area';
import { QUESTION_SECTIONS } from '../../canvas-quiz-page.constants';

import { IMySkillsProps } from './my-skills.typings';

import { HeaderSectionStyled } from '../header-section.styles';
import { MySkillsStyled as Styled } from './my-skills.styles';

const coreCriticalHeaders = [
  'thinking critically',
  'interacting with others',
  'staying relevant',
];

export const MySkills: FC<IMySkillsProps> = (props) => {
  const { onSubmitSection, questionListForSection, onChangeAnswer } = props;

  const questionListForCategories = useMemo(() => {
    const categoriesHashMap: Record<string, IQuestionListItem[]> = {
      'interacting with others': [],
      'staying relevant': [],
      'thinking critically': [],
      technicalSkills: [],
    };

    questionListForSection.forEach((question) => {
      const category =
        categoriesHashMap[question.subcategory || 'technicalSkills'];
      category.push(question);
    });
    return categoriesHashMap;
  }, [questionListForSection]);

  const onChangeTextField =
    (id: string) => (event: ChangeEvent<HTMLTextAreaElement>) => {
      onChangeAnswer(id, event.target.value);
    };

  return (
    <div>
      <HeaderSectionStyled.TitleWrapper>
        <h1>My SKILLS</h1>
      </HeaderSectionStyled.TitleWrapper>
      <InfoBlock title="Core critical skills">
        <span>
          <a
            href="https://www.skillsfuture.gov.sg/-/media/SkillsFuture/Files/Skills-Framework/Critical-Core-Skills/CCS-Proficiency-Level-Ruler.pdf"
            target="_blank"
            rel="noreferrer"
          >
            {'Click here '}
          </a>
          to read more about Core critical skills.
        </span>
      </InfoBlock>
      <Styled.Content>
        {coreCriticalHeaders.map((item) => (
          <div key={item}>
            <Styled.Row>
              <Styled.HeaderTitle>{item}</Styled.HeaderTitle>
              <Styled.HeaderRightBlock />
            </Styled.Row>
            {questionListForCategories[item].map((question) => {
              const options =
                question.answerOptions?.map((item) => item.text) || [];
              const value = question.answers[0]?.value || '';
              return (
                <Styled.Row key={question.id}>
                  <Styled.Label>{question.title}</Styled.Label>
                  <Styled.ValueItem>
                    <SelectQuestion
                      id={question.id}
                      onChangeAnswer={onChangeAnswer}
                      options={options}
                      value={value}
                    />
                  </Styled.ValueItem>
                </Styled.Row>
              );
            })}
          </div>
        ))}
      </Styled.Content>
      {questionListForCategories.technicalSkills.map((question) => (
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
            color={QUESTION_SECTIONS['MY SKILLS'].color}
            onClick={onSubmitSection}
          />
        </Loader>
      </Styled.Control>
    </div>
  );
};
