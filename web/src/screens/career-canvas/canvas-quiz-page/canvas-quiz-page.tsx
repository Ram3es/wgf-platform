import React, { FC } from 'react';

import { Header } from '@components/header';
import { Fit } from './components/fit-section';
import { Grit } from './components/grit-section';
import { MySkills } from './components/my-skills-section';
import { PracticalityCheck } from './components/practicality-check-section';
import { QuestionsNavigation } from './components/questions-navigation';
import { Wit } from './components/wit-section';

import { useCanvasQuizState } from './canvas-quiz-page.state';

import { QUESTION_SECTIONS } from './canvas-quiz-page.constants';

import { TQuestionSections } from './canvas-quiz-page.typings';

import { CanvasQuizPageStyled as Styled } from './canvas-quiz-page.styles';

export const CanvasQuizPage: FC = () => {
  const {
    activeSection,
    completedSections,
    questionListForSection,
    setActiveItem,
    onSubmitSection,
    onChangeAnswer,
  } = useCanvasQuizState();

  const NAVIGATION_HASH_MAPS: Record<string, React.ReactNode> = {
    WIT: (
      <Wit
        questionListForSection={questionListForSection}
        onChangeAnswer={onChangeAnswer}
        onSubmitSection={onSubmitSection}
      />
    ),
    GRIT: (
      <Grit
        questionListForSection={questionListForSection}
        onChangeAnswer={onChangeAnswer}
        onSubmitSection={onSubmitSection}
      />
    ),
    FIT: (
      <Fit
        onChangeAnswer={onChangeAnswer}
        questionListForSection={questionListForSection}
        onSubmitSection={onSubmitSection}
      />
    ),
    'MY SKILLS': <MySkills />,
    'PRACTICALITY CHECK': (
      <PracticalityCheck
        onChangeAnswer={onChangeAnswer}
        questionListForSection={questionListForSection}
        onSubmitSection={onSubmitSection}
      />
    ),
  };

  return (
    <>
      <Header />
      <Styled.Container>
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
