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
    const answeredList = list.filter((item) => item.answers[0]?.value);
    const percent = Math.round(answeredList.length * (100 / list.length)) || 0;

    setState({
      percent,
    });
  }, [list]);

  const changeHandler = (number: number) => (value: number) => {
    setState({
      questionList: list.map((item) => {
        if (item.order === number) {
          return {
            ...item,
            answers: [{ ...item.answers[0], value: value.toString() }],
            isError: false,
          };
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
        ({ title, order, answers, isError, id }, index) => (
          <QuestionListStyles.Item key={id}>
            <QuestionListStyles.ItemTitle
              isError={!!isError}
              ref={errorRef.current[index]}
            >
              {order}. {title}
            </QuestionListStyles.ItemTitle>
            <QuestionListStyles.ItemRadioWrapper>
              <RadioButtonGroup
                isVariantQuiz
                containerWidth="20%"
                radioGroup={RADIO_LIST_QUIZ}
                onChange={changeHandler(order)}
                initValue={+answers[0]?.value ?? 0}
              />
            </QuestionListStyles.ItemRadioWrapper>
          </QuestionListStyles.Item>
        )
      )}
    </QuestionListStyles.Wrapper>
  );
};
