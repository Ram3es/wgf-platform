import React, { useEffect } from 'react';

import { RadioButtonGroup } from '@components/radio-button-group';

import { STRINGS } from '@constants/strings';
import { RADIO_LIST_QUIZ } from './question-list.constants';

import { IQuestionListProps } from './question-list.typings';

import { QuestionListStyles } from './question-list.styles';

export const QuestionList: React.FC<IQuestionListProps> = ({
  list,
  setState,
  currentQuestionList,
  errorRef,
}) => {
  useEffect(() => {
    const answeredList = list.filter((item) => item.answerValue);
    const percent = Math.round(answeredList.length * (100 / list.length));

    setState({
      percent,
    });
  }, [list]);

  const changeHandler = (number: number) => (value: number) => {
    setState({
      questionList: list.map((item) => {
        if (item.questionNumber === number) {
          return { ...item, answerValue: value, isError: false };
        }
        return item;
      }),
    });
  };

  return (
    <QuestionListStyles.Wrapper>
      <QuestionListStyles.Text>
        {STRINGS.questionListText}
      </QuestionListStyles.Text>
      {currentQuestionList.map(
        ({ title, questionNumber, answerValue, isError }, index) => (
          <QuestionListStyles.Item key={questionNumber}>
            <QuestionListStyles.ItemTitle
              isError={!!isError}
              ref={errorRef.current[index]}
            >
              {title}
            </QuestionListStyles.ItemTitle>
            <QuestionListStyles.ItemRadioWrapper>
              <RadioButtonGroup
                isVariantQuiz
                containerWidth="20%"
                radioGroup={RADIO_LIST_QUIZ}
                onChange={changeHandler(questionNumber)}
                initValue={answerValue ?? 0}
              />
            </QuestionListStyles.ItemRadioWrapper>
          </QuestionListStyles.Item>
        )
      )}
    </QuestionListStyles.Wrapper>
  );
};
