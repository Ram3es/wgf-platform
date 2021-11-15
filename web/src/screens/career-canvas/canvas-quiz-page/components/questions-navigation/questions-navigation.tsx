import React, { FC } from 'react';

import { Icon } from '@components/icon';

import { QUESTION_SECTIONS } from '../../canvas-quiz-page.constants';
import { QUESTION_SECTION_TITLES } from './questions-navigation.constants';

import { IQuestionsNavigationProps } from './questions-navigation.typings';

import { QuestionNavigationStyled as Styled } from './questions-navigation.styles';

export const QuestionsNavigation: FC<IQuestionsNavigationProps> = (props) => {
  const { activeSection, setActiveItem, completedSections } = props;

  return (
    <Styled.Wrapper>
      {QUESTION_SECTION_TITLES.map((item) => {
        const isCompleted = completedSections.includes(item);
        return (
          <Styled.SectionItem
            key={item}
            color={QUESTION_SECTIONS[item].color}
            isActive={activeSection === item}
            onClick={setActiveItem(item)}
            isCompleted={isCompleted}
          >
            <span>{item}</span>
            {isCompleted && (
              <i>
                <Icon type="selected" />
              </i>
            )}
          </Styled.SectionItem>
        );
      })}
    </Styled.Wrapper>
  );
};
