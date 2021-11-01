import React, { useEffect } from 'react';

import { Loader } from '@components/loader';
import { RadioButtonGroup } from '@components/radio-button-group';
import { Switcher } from '@components/switcher/switcher';
import { Spacer } from '@styles/components/spacer';

import { storageService } from '@services/storage/storage';

import { PROMISES_AREA } from '@constants/promises-area';
import { STRINGS } from '@constants/strings';
import { RADIO_LIST_QUIZ } from './question-list.constants';

import { IQuestionListProps } from './question-list.typings';

import { QuestionListStyles as Styled } from './question-list.styles';

export const QuestionList: React.FC<IQuestionListProps> = ({
  list,
  setState,
  currentQuestionList,
  errorRef,
  isShowLatestResult,
  currentPage,
  isLatestAnswers,
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

  const toogleLatestAnswers = (checked: boolean) => {
    const quizTitle = storageService.getQuiz()?.title || '';
    storageService.setQuestionList([], quizTitle);
    setState({ isShowLatestResult: checked });
  };

  return (
    <Styled.Wrapper>
      <Styled.Text>{STRINGS.questionListText}</Styled.Text>
      {currentPage === 1 && isLatestAnswers && (
        <Spacer mb="4">
          <Styled.SwitchAnswers>
            <span>
              {isShowLatestResult
                ? 'Hide latest answers'
                : 'Auto-populate latest answers'}
            </span>
            <Switcher
              handleChange={toogleLatestAnswers}
              isChecked={isShowLatestResult}
            />
          </Styled.SwitchAnswers>
        </Spacer>
      )}
      <Loader area={PROMISES_AREA.getCaasQuestionList}>
        {currentQuestionList.map(
          ({ title, order, answers, isError, id }, index) => (
            <Styled.Item key={id}>
              <Styled.ItemTitle
                isError={!!isError}
                ref={errorRef.current[index]}
              >
                {order}. {title}
              </Styled.ItemTitle>
              <Styled.ItemRadioWrapper>
                <RadioButtonGroup
                  isVariantQuiz
                  containerWidth="20%"
                  radioGroup={RADIO_LIST_QUIZ}
                  onChange={changeHandler(order)}
                  initValue={+answers[0]?.value ?? 0}
                />
              </Styled.ItemRadioWrapper>
            </Styled.Item>
          )
        )}
      </Loader>
    </Styled.Wrapper>
  );
};
