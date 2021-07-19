import React from 'react';

import { COLORS } from '@styles/colors';

import { images } from '@constants/images';
import { STRINGS } from '@constants/strings';

import { IElementCategories, IResultSummaryProps, IStarsIconCount } from './result-summary.typings';

import { TitleStyles } from '@styles/components/title-styles';
import { ResultSummaryStyles } from './result-summary.styles';

export const ResultSummary: React.FC<IResultSummaryProps> = ({ results }) => {
  const starsIconCount: IStarsIconCount = {
    Low: Array.from(Array(1).keys()),
    Moderate: Array.from(Array(2).keys()),
    High: Array.from(Array(3).keys()),
  };

  const categories: IElementCategories[] = [
    {
      title: 'CONCERN',
      imageHead: images.concernImage,
      score: results.concern.score,
      imageBody: images.concernBodyImage,
      level: results.concern.level,
      starIcon: images.starConcern,
      description: '[List of descriptions for Attributes A].',
    },
    {
      title: 'CONTROL',
      imageHead: images.controlImage,
      score: results.control.score,
      imageBody: images.controlBodyImage,
      level: results.control.level,
      starIcon: images.starControl,
      description: '[List of descriptions for Attributes B].',
    },
    {
      title: 'CURIOSITY',
      imageHead: images.curiosityImage,
      score: results.curiosity.score,
      imageBody: images.curiosityBodyImage,
      level: results.curiosity.level,
      starIcon: images.starCuriosity,
      description: '[List of descriptions for Attributes C].',
    },
    {
      title: 'CONFIDENCE',
      imageHead: images.confidenceImage,
      score: results.confidence.score,
      imageBody: images.confidenceBodyImage,
      level: results.confidence.level,
      starIcon: images.starConfidence,
      description: '[List of descriptions for Attributes D].',
    },
    {
      title: 'COOPERATION',
      imageHead: images.cooperationImage,
      score: results.cooperation.score,
      imageBody: images.cooperationBodyImage,
      level: results.cooperation.level,
      starIcon: images.starCooperation,
      description: '[List of descriptions for Attributes E].',
    },
  ];

  return (
    <>
      <TitleStyles.h1 color={COLORS.grey} paddingY="0">
        {STRINGS.resultSummary.title}
      </TitleStyles.h1>
      <ResultSummaryStyles.CardWrapper>
        {categories.map(
          (
            {
              title,
              imageHead,
              imageBody,
              level,
              score,
              starIcon,
              description,
            },
            i
          ) => (
            <ResultSummaryStyles.CardItem key={i}>
              <ResultSummaryStyles.CardHeading>
                <img src={imageHead} />
                <TitleStyles.h2 color={COLORS.white} paddingY="0">
                  {title}
                </TitleStyles.h2>
              </ResultSummaryStyles.CardHeading>
              <ResultSummaryStyles.CardBody>
                <span>{STRINGS.resultSummary.score}</span>
                <strong>{score}</strong>
                <img src={imageBody} />
                <ResultSummaryStyles.CardBodyFooter>
                  <ResultSummaryStyles.StarWrapper>
                    {starsIconCount[level].map((item) => (
                      <img src={starIcon} key={item} />
                    ))}
                  </ResultSummaryStyles.StarWrapper>
                  <strong>{level}</strong>
                </ResultSummaryStyles.CardBodyFooter>
              </ResultSummaryStyles.CardBody>
              <ResultSummaryStyles.CardDescriprion>
                {description}
              </ResultSummaryStyles.CardDescriprion>
            </ResultSummaryStyles.CardItem>
          )
        )}
      </ResultSummaryStyles.CardWrapper>
    </>
  );
};
