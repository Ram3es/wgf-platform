import React from 'react';

import { COLORS } from '@styles/colors';

import { STRINGS } from '@constants/strings';

import { INextStepsProps, IRecomendationMessage, IStepsCategorie } from './next-steps.typings';

import { TitleStyles } from '@styles/components/title-styles';
import { NextStepsStyles } from './next-steps.styles';

export const NextSteps: React.FC<INextStepsProps> = ({ results }) => {
  const recomendationMessage: IRecomendationMessage = {
    Low: STRINGS.nextSteps.levelMessage.low,
    Moderate: STRINGS.nextSteps.levelMessage.moderate,
    High: STRINGS.nextSteps.levelMessage.high,
  };

  const categories: IStepsCategorie[] = [
    {
      title: STRINGS.nextSteps.categories.concern.title,
      level: results.concern.level,
      description: STRINGS.nextSteps.categories.concern.description,
      color: COLORS.greenLite,
    },
    {
      title: STRINGS.nextSteps.categories.control.title,
      level: results.control.level,
      description: STRINGS.nextSteps.categories.control.description,
      color: COLORS.blue,
    },
    {
      title: STRINGS.nextSteps.categories.curiosity.title,
      level: results.curiosity.level,
      description: STRINGS.nextSteps.categories.curiosity.description,
      color: COLORS.pink,
    },
    {
      title: STRINGS.nextSteps.categories.confidence.title,
      level: results.confidence.level,
      description: STRINGS.nextSteps.categories.confidence.description,
      color: COLORS.yellow,
    },
    {
      title: STRINGS.nextSteps.categories.cooperation.title,
      level: results.cooperation.level,
      description: STRINGS.nextSteps.categories.cooperation.description,
      color: COLORS.violet,
    },
  ];

  return (
    <NextStepsStyles.Wrapper>
      <TitleStyles.h1 color={COLORS.grey} paddingY="0">
        {STRINGS.nextSteps.title}
      </TitleStyles.h1>
      <NextStepsStyles.CardWrapper>
        {categories.map(({ title, level, color, description }, i) => (
          <NextStepsStyles.CardItem key={i}>
            <NextStepsStyles.CardHeading>
              <div>
                <span>{STRINGS.nextSteps.score}</span>
                <strong>{level}</strong>
              </div>
              <div>
                <span>{STRINGS.nextSteps.on}</span>
                <TitleStyles.h2 color={color} paddingY="0" textAlign="left">
                  {title}
                </TitleStyles.h2>
              </div>
            </NextStepsStyles.CardHeading>
            <NextStepsStyles.CardText>
              <p>{`${recomendationMessage[level]} ${description}`}</p>
            </NextStepsStyles.CardText>
          </NextStepsStyles.CardItem>
        ))}
      </NextStepsStyles.CardWrapper>
    </NextStepsStyles.Wrapper>
  );
};
