import React, { ChangeEvent, FC } from 'react';

import { Button } from '@components/button';
import { InputRange } from '@components/input-range';

import { IMAGES } from '@constants/images';
import { QUESTION_SECTIONS } from '../../canvas-quiz-page.constants';
import { QUESTION_COLORS } from './wit.constants';

import { IWitProps } from './wit.typings';

import { TitleStyles } from '@styles/components/title-styles';
import { HeaderSectionStyled } from '../header-section.styles';
import { WitStyled as Styled } from './wit.styles';

export const Wit: FC<IWitProps> = (props) => {
  const { questionListForSection, onSubmitSection, updateState } = props;

  const onChangeRange =
    (id: string) => (event: ChangeEvent<HTMLInputElement>) => {
      updateState((prev) => ({
        questionList: prev.questionList.map((item) => {
          if (item.id === id) {
            return {
              ...item,
              answers: [{ ...item.answers[0], value: event.target.value }],
              isError: false,
            };
          }
          return item;
        }),
      }));
    };

  return (
    <div>
      <HeaderSectionStyled.TitleWrapper>
        <h1>My SMARTs</h1>
        <HeaderSectionStyled.SectionLogo>WIT</HeaderSectionStyled.SectionLogo>
      </HeaderSectionStyled.TitleWrapper>
      <Styled.Title>
        <p>What do I like and am naturally good at?</p>
        <Styled.InfoIcon>
          i
          <Styled.InfoBlock>
            <span>
              Take this
              <a
                href="https://www.flyingcape.com.sg/mi"
                target="_blank"
                rel="noreferrer"
              >
                {' quick test '}
              </a>
              to find out your Smarts
            </span>
          </Styled.InfoBlock>
        </Styled.InfoIcon>
      </Styled.Title>
      <Styled.DescriptionWrapper>
        <p>Rate yourself from 1 (not good) to 10 (perfect)</p>
      </Styled.DescriptionWrapper>
      {questionListForSection
        .sort((first, second) => first.order - second.order)
        .map((question, index) => (
          <div key={question.id}>
            <Styled.QuestionWrapper>
              <Styled.Visual>
                <img src={IMAGES[question?.subcategory || '']} />
              </Styled.Visual>
              <Styled.Label>
                <TitleStyles.h3 color={QUESTION_COLORS[index]} textAlign="left">
                  {question?.subcategory}
                </TitleStyles.h3>
                <span>{question.title}</span>
              </Styled.Label>
            </Styled.QuestionWrapper>
            <InputRange
              onChange={onChangeRange(question.id)}
              minRange={1}
              maxRange={10}
              value={+question.answers[0]?.value || 5}
              color={QUESTION_COLORS[index]}
              variant="number"
            />
          </div>
        ))}
      <Styled.Control>
        <Button
          title="Save & Next Section"
          borderRadius="8px"
          color={QUESTION_SECTIONS.WIT.color}
          onClick={onSubmitSection}
        />
      </Styled.Control>
    </div>
  );
};
