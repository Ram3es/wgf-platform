import { COLORS } from '@styles/colors';

import { IMAGES } from '@constants/images';

import { IElementCategories, IStarsIcon } from './result-summary.typings';

export const STARS_ICONS: IStarsIcon = {
  Low: {
    icon: IMAGES.starLow,
    count: Array.from(Array(1).keys()),
  },
  Moderate: {
    icon: IMAGES.starModerate,
    count: Array.from(Array(2).keys()),
  },
  High: {
    icon: IMAGES.starHigh,
    count: Array.from(Array(3).keys()),
  },
};

export const getCategoriesList = (results: IResults): IElementCategories[] => {
  return [
    {
      title: 'Optimistic Planner',
      imageHead: IMAGES.concernImage,
      score: results.concern.score,
      imageBody: IMAGES.concernBodyImage,
      level: results.concern.level,
      description:
        'Optimistic Planners are concerned and positive about their future. Looking ahead to extend their current capabilities and roles, they regularly scan their environment for the need to change and take a planning, future-oriented approach to their careers.',
      superPower: 'Planning',
      color: COLORS.greenLite,
    },
    {
      title: 'Responsible Shaper',
      imageHead: IMAGES.controlImage,
      score: results.control.score,
      imageBody: IMAGES.controlBodyImage,
      level: results.control.level,
      description:
        'Responsible Shapers are self-aware and diligently manage their careers in a disciplined and organised manner. Skilled at making good decisions, they believe that they, and not external forces, have control over their career outcomes.',
      superPower: 'Decision Making',
      color: COLORS.blue,
    },
    {
      title: 'Inquisitive Explorer',
      imageHead: IMAGES.curiosityImage,
      score: results.curiosity.score,
      imageBody: IMAGES.curiosityBodyImage,
      level: results.curiosity.level,
      description:
        'Inquisitive Explorers are curious and constantly looking into future possibilities. By learning more about themselves, possible career pathways and just exploring the world around them, they maximize their options and allow a sense of calling to emerge.',
      superPower: 'Exploring',
      color: COLORS.pink,
    },
    {
      title: 'Capable Overcomer',
      imageHead: IMAGES.confidenceImage,
      score: results.confidence.score,
      imageBody: IMAGES.confidenceBodyImage,
      level: results.confidence.level,
      description:
        'Capable Overcomers have the confidence and courage to believe that they can surmount difficulties that arise in their careers. They pro-actively seek to build new skills and welcome opportunities to stretch beyond what they are currently capable of.',
      superPower: 'Problem Solving',
      color: COLORS.yellow,
    },
    {
      title: 'Social Collaborator',
      imageHead: IMAGES.cooperationImage,
      score: results.cooperation.score,
      imageBody: IMAGES.cooperationBodyImage,
      level: results.cooperation.level,
      description:
        'Social Collaborators have advanced interpersonal skills that enable them to accelerate their career development. They are often valued team players and good listeners whose pro-active contributions help everybody else succeed.',
      superPower: 'Collaborating',
      color: COLORS.violet,
    },
  ];
};
