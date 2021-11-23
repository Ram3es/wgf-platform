import React, { ChangeEvent, FC } from 'react';

import { InfoBlock } from '@components/info-block';
import { InputRange } from '@components/input-range';
import { COLORS } from '@styles/colors';
import { AnswerAliases } from './answer-aliases';

import { IMAGES } from '@constants/images';
import { RANGE_HASH_MAPS } from '@screens/career-canvas/career-canvas.constants';
import { reverseRangeHashMap } from './me-career-anchors.constants';

import { IPropsMyCareerAnchors } from './my-career-anchors.typings';

import { MyCareerAnchorsStyled as Styled } from './my-career-anchors.styles';

export const MyCareerAnchors: FC<IPropsMyCareerAnchors> = (props) => {
  const { onChangeAnswer, questionList } = props;

  const onChange = (id: string) => (event: ChangeEvent<HTMLInputElement>) => {
    const hashMaps = reverseRangeHashMap();
    onChangeAnswer(id, hashMaps[event.target.value]);
  };

  return (
    <>
      <Styled.Title>
        <InfoBlock title="My Career Anchors" isPositionCenter>
          <span>
            Take this
            <a
              href="https://psycho-tests.com/test/sheins-career-anchors"
              target="_blank"
              rel="noreferrer"
            >
              {' quick test '}
            </a>
            to find out your career anchors
          </span>
        </InfoBlock>
      </Styled.Title>
      <Styled.Answers>
        <AnswerAliases />
      </Styled.Answers>
      {questionList.map((question) => (
        <Styled.QuestionWrapper key={question.id}>
          <Styled.LabelWrapper>
            <Styled.Visual>
              <img src={IMAGES[question.title]} />
            </Styled.Visual>
            <span>{question.title}</span>
          </Styled.LabelWrapper>
          <Styled.AnswersInQuestionBlock>
            <AnswerAliases />
          </Styled.AnswersInQuestionBlock>
          <Styled.RangeWrapper>
            <InputRange
              onChange={onChange(question.id)}
              minRange={1}
              maxRange={5}
              value={+RANGE_HASH_MAPS[question.answers[0]?.value] || 3}
              color={question.color || COLORS.liteBlue}
              variant="label"
            />
          </Styled.RangeWrapper>
        </Styled.QuestionWrapper>
      ))}
    </>
  );
};
