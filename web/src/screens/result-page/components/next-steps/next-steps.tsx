import React from 'react';

import { COLORS } from '@styles/colors';

import { STRINGS } from '@constants/strings';
import { getCategoriesList, recomendationMessage } from './next-steps.constants';

import { INextStepsProps } from './next-steps.typings';

import { TitleStyles } from '@styles/components/title-styles';
import { NextStepsStyles } from './next-steps.styles';

export const NextSteps: React.FC<INextStepsProps> = ({ results }) => {
  const categories = getCategoriesList(results);

  return (
    <NextStepsStyles.Wrapper>
      <TitleStyles.h1 color={COLORS.grey} paddingY="20px">
        {STRINGS.nextSteps.title}
      </TitleStyles.h1>
      <NextStepsStyles.CardWrapper>
        {categories.map(({ title, level, color, description }, i) => (
          <NextStepsStyles.CardItem key={i}>
            <NextStepsStyles.CardHeading color={COLORS.levelResult[level]}>
              <div>
                <span>{STRINGS.nextSteps.score}</span>
                <strong>{level}</strong>
              </div>
              <div>
                <span>{STRINGS.nextSteps.span}</span>
                <TitleStyles.h2 color={color} paddingY="0" textAlign="left">
                  {title}
                </TitleStyles.h2>
              </div>
            </NextStepsStyles.CardHeading>
            <NextStepsStyles.CardText>
              <strong>{recomendationMessage[level]}</strong>
              {description.map((text, i) => (
                <p key={i}>{text}</p>
              ))}
            </NextStepsStyles.CardText>
          </NextStepsStyles.CardItem>
        ))}
      </NextStepsStyles.CardWrapper>
    </NextStepsStyles.Wrapper>
  );
};
