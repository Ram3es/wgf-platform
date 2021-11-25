import React, { FC } from 'react';

import { Button } from '@components/button';
import { Header } from '@components/header';
import { Loader } from '@components/loader';
import { Fit } from './components/fit-section';
import { Grit } from './components/grit-section';
import { MySkills } from './components/my-skills-section';
import { PracticalityCheck } from './components/practicality-check-section';
import { QuestionsNavigation } from './components/questions-navigation';
import { Wit } from './components/wit-section';

import { useAppSelector } from '@services/hooks/redux';
import { useCanvasQuizState } from './canvas-quiz-page.state';

import { PROMISES_AREA } from '@constants/promises-area';
import { STRINGS } from '@constants/strings';
import { ROLES } from '@constants/user-roles';
import { QUESTION_SECTIONS } from './canvas-quiz-page.constants';

import { TQuestionSections } from './canvas-quiz-page.typings';

import { CanvasQuizPageStyled as Styled } from './canvas-quiz-page.styles';

export const CanvasQuizPage: FC = () => {
  const {
    questionListForSection,
    activeSection,
    completedSections,
    setActiveItem,
    onSubmitSection,
    onChangeAnswer,
    downloadCsv,
  } = useCanvasQuizState();

  const { user } = useAppSelector((state) => state);

  const props = {
    questionListForSection: questionListForSection,
    onChangeAnswer: onChangeAnswer,
    onSubmitSection: onSubmitSection,
  };

  const NAVIGATION_HASH_MAPS: Record<string, React.ReactNode> = {
    WIT: <Wit {...props} />,
    GRIT: <Grit {...props} />,
    FIT: <Fit {...props} />,
    'MY SKILLS': <MySkills {...props} />,
    'PRACTICALITY CHECK': <PracticalityCheck {...props} />,
  };

  return (
    <>
      <Header />
      <Styled.Container>
        <Styled.CsvButtonContainer>
          {user.role === ROLES['superAdmin'] && (
            <Loader area={PROMISES_AREA.getCareerCanvasCsv}>
              <Button
                title={STRINGS.button.downloadCsv}
                onClick={downloadCsv}
                color={
                  QUESTION_SECTIONS[activeSection as TQuestionSections].color
                }
              />
            </Loader>
          )}
        </Styled.CsvButtonContainer>
        <Styled.Wrapper>
          <QuestionsNavigation
            setActiveItem={setActiveItem}
            activeSection={activeSection}
            completedSections={completedSections}
          />
          <Styled.SectionWrapper
            color={QUESTION_SECTIONS[activeSection as TQuestionSections].color}
          >
            {NAVIGATION_HASH_MAPS[activeSection]}
          </Styled.SectionWrapper>
        </Styled.Wrapper>
      </Styled.Container>
    </>
  );
};
