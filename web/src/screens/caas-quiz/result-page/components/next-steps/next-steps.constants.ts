import { COLORS } from '@styles/colors';

import { STRINGS } from '@constants/strings';

import { IRecomendationMessage, IStepsCategorie } from './next-steps.typings';

export const recomendationMessage: IRecomendationMessage = {
  Low: STRINGS.nextSteps.levelMessage.low,
  Moderate: STRINGS.nextSteps.levelMessage.moderate,
  High: STRINGS.nextSteps.levelMessage.high,
};

export const getCategoriesList = (results: IResults): IStepsCategorie[] => {
  const list = [
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
      color: COLORS.liteBlue,
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
      level: results.cooperation?.level || 'Low',
      description: STRINGS.nextSteps.categories.cooperation.description,
      color: COLORS.violet,
    },
  ];

  if (!results.cooperation) {
    const newList = [...list];
    newList.pop();
    return newList;
  }

  return list;
};
