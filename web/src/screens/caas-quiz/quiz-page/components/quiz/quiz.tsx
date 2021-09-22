import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import { Button } from '@components/button';
import { ProgressBar } from '@components/progress-bar';
import { COLORS } from '@styles/colors';
import { PopUp } from '../pop-up';
import { QuestionList } from '../questionList';

import { storageService } from '@services/storage/storage';
import { useQuizState } from './quiz.state';

import { STRINGS } from '@constants/strings';

import { TitleStyles } from '@styles/components/title-styles';
import { QuizStyles as Styled } from './quiz.styles';

export const Quiz: React.FC = () => {
  const { replace } = useHistory();
  const quiz = storageService.getQuiz();

  useEffect(() => {
    if (!quiz) {
      return replace('/');
    }
  }, [quiz]);

  if (!quiz) {
    return <div />;
  }

  const {
    updateState,
    currentPage,
    user,
    questionList,
    onSubmit,
    percent,
    decrementPage,
    questionListForPage,
    errorRef,
    isShowModal,
    isLastPage,
  } = useQuizState();

  if (isShowModal) {
    return <PopUp user={user!} setState={updateState} />;
  }

  return (
    <div>
      <Styled.Wrapper>
        <TitleStyles.h2>
          {STRINGS.form.title} {user?.firstName}
        </TitleStyles.h2>
        <ProgressBar percent={percent} />
        <QuestionList
          list={questionList}
          setState={updateState}
          currentQuestionList={questionListForPage}
          errorRef={errorRef}
        />
        <Styled.ControlPanel>
          {currentPage === 1 ? (
            <div />
          ) : (
            <Button
              title={STRINGS.button.back}
              onClick={decrementPage}
              color={COLORS.greenLite}
              image="back"
            />
          )}
          <Button
            title={isLastPage ? STRINGS.button.submit : STRINGS.button.next}
            onClick={onSubmit}
            color={COLORS.greenLite}
            image="next"
            type="submit"
          />
        </Styled.ControlPanel>
      </Styled.Wrapper>
    </div>
  );
};
