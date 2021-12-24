import React, { ChangeEvent, FC } from 'react';

import { InfoBlock } from '@components/info-block';
import { InputRange } from '@components/input-range';
import { COLORS } from '@styles/colors';

import { IPropsMyHollandCode } from './my-holland-code.typings';

import { MyHollandCodeStyled as Styled } from './my-holland-code.styles';

export const MyHollandCode: FC<IPropsMyHollandCode> = (props) => {
  const { onChangeAnswer, questionList } = props;

  const handleChange =
    (id: string) => (event: ChangeEvent<HTMLInputElement>) => {
      onChangeAnswer(id, event.target.value);
    };

  return (
    <Styled.Wrapper>
      <Styled.Title>
        <InfoBlock title="My Holland Code" isPositionCenter>
          <span>
            Take this
            <a
              href="https://uhcc.hawaii.edu/career_explorer/assessments/riasec_multiLang.php"
              target="_blank"
              rel="noreferrer"
            >
              {' quick test '}
            </a>
            to find out your Holland Code
          </span>
        </InfoBlock>
      </Styled.Title>
      {questionList.map((question) => (
        <Styled.QuestionWrapper key={question.id}>
          <Styled.LabelWrapper>
            <span>{question.title}</span>
          </Styled.LabelWrapper>
          <Styled.RangeWrapper>
            <InputRange
              onChange={handleChange(question.id)}
              minRange={1}
              maxRange={6}
              value={+question.answers[0]?.value || 3}
              color={COLORS.lightBlue}
              variant="number"
            />
          </Styled.RangeWrapper>
        </Styled.QuestionWrapper>
      ))}
    </Styled.Wrapper>
  );
};
