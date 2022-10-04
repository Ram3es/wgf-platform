import React from 'react';
import { Button } from '@components/button';
import { Loader } from '@components/loader';
import { ProgressBar } from '@components/progress-bar';
import { STRINGS } from '@constants/strings';
import { PROMISES_AREA } from '@constants/promises-area';
import { COLORS } from '@styles/colors';
import { TitleStyles } from '@styles/components/title-styles';
import { storageService } from '@services/storage/storage';
import { PopUp } from '../pop-up';
import { useQuizState } from './quiz.state';
import { QuestionList } from '../questionList';
import { QuizStyles as Styled } from './quiz.styles';

export const Quiz: React.FC = () => {
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
    isShowLatestResult,
    quiz,
  } = useQuizState();

  if (isShowModal) {
    return <PopUp user={user} setState={updateState} />;
  }

  return (
    <Styled.Wrapper>
      <TitleStyles.h2>
        {STRINGS.form.title} {user.firstName}
      </TitleStyles.h2>
      <ProgressBar percent={percent} />
      <QuestionList
        list={questionList}
        setState={updateState}
        currentQuestionList={questionListForPage}
        errorRef={errorRef}
        isShowLatestResult={isShowLatestResult}
        isLatestAnswers={
          storageService.getIsQuizLatestAnswers(quiz?.title || '') || false
        }
        currentPage={currentPage}
      />
      <Loader area={PROMISES_AREA.sendCaasAnswers}>
        <Styled.ControlPanel>
          {currentPage === 1 ? (
            <div />
          ) : (
            <Button
              title={STRINGS.button.back}
              onClick={decrementPage}
              color={COLORS.greenLight}
              iconType="back"
            />
          )}
          <Button
            title={isLastPage ? STRINGS.button.submit : STRINGS.button.next}
            onClick={onSubmit}
            color={COLORS.greenLight}
            iconType="next"
            isIconRight
            type="submit"
          />
        </Styled.ControlPanel>
      </Loader>
    </Styled.Wrapper>
  );
};
