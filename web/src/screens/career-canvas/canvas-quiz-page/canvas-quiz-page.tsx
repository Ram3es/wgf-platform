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
    onChangeRange,
  } = useCanvasQuizState();

  const NAVIGATION_HASH_MAPS: Record<string, React.ReactNode> = {
    WIT: (
      <Wit
        questionListForSection={questionListForSection}
        onChangeRange={onChangeRange}
        onSubmitSection={onSubmitSection}
      />
    ),
    GRIT: (
      <Grit
        questionListForSection={questionListForSection}
        onChangeRange={onChangeRange}
        onSubmitSection={onSubmitSection}
      />
    ),
    FIT: <Fit />,
    'MY SKILLS': <MySkills />,
    'PRACTICALITY CHECK': <PracticalityCheck />,
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
