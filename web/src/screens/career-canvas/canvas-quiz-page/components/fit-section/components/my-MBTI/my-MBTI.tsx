import React, { FC } from 'react';

import { InfoBlock } from '@components/info-block';
import { SelectQuestion } from './components/select-question';

import { IPropsMyMBTI } from './my-MBTI.typings';

import { MyMBTIStyled as Styled } from './my-MBTI.styles';

export const MyMBTI: FC<IPropsMyMBTI> = (props) => {
  const { questionList, onChangeAnswer } = props;

  return (
    <>
      <Styled.Title>
        <InfoBlock title="My MBTI" isPositionCenter>
          <span>
            Take this
            <a
              href="http://www.humanmetrics.com/personality"
              target="_blank"
              rel="noreferrer"
            >
              {' quick test '}
            </a>
            to find out your MBTI
          </span>
        </InfoBlock>
      </Styled.Title>
      <Styled.Wrapper>
        {questionList.map(({ id, answers, answerOptions }) => {
          const options = answerOptions?.map((item) => item.text) || [];
          const value = answers[0]?.value || '';
          return (
            <SelectQuestion
              key={id}
              id={id}
              onChangeAnswer={onChangeAnswer}
              options={options}
              value={value}
            />
          );
        })}
      </Styled.Wrapper>
    </>
  );
};
