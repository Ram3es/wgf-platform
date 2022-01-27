import React from 'react';

import { Button } from '@components/button';
import { Loader } from '@components/loader';
import { ProgressBar } from '@components/progress-bar';
import { COLORS } from '@styles/colors';
import { PopUp } from '../pop-up';
import { QuestionList } from '../questionList';

import { storageService } from '@services/storage/storage';
import { useQuizState } from './quiz.state';

import { PROMISES_AREA } from '@constants/promises-area';
import { STRINGS } from '@constants/strings';
import { ROLES } from '@constants/user-roles';

import { TitleStyles } from '@styles/components/title-styles';
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
    downloadCsv,
    isShowLatestResult,
    quiz,
  } = useQuizState();

  if (isShowModal) {
    return <PopUp user={user} setState={updateState} />;
  }

  return (
    <Styled.Wrapper>
      {user.role === ROLES['superAdmin'] && (
        <Loader area={PROMISES_AREA.getCaasCsv}>
          <Styled.DownloadButton>
            <Button
              title={STRINGS.button.downloadCsv}
              onClick={downloadCsv}
              color={COLORS.greenLight}
            />
          </Styled.DownloadButton>
        </Loader>
      )}
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
