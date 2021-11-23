import { COLORS } from '@styles/colors';

import { IInitialQuestionsState } from './canvas-quiz-page.typings';

export const QUESTION_SECTIONS = {
  WIT: { title: 'WIT', color: COLORS.greenLite, categories: ['mySmarts'] },
  GRIT: {
    title: 'GRIT',
    color: COLORS.liteBlue,
    categories: ['myPerfomanceCharacter'],
  },
  FIT: {
    title: 'FIT',
    color: COLORS.pink,
    categories: [
      'myValues',
      'myCareerAnchors',
      'myMBTI',
      'myHollandCode',
      'myIdealEnvironment',
    ],
  },
  'MY SKILLS': {
    title: 'MY SKILLS',
    color: COLORS.default,
    categories: ['coreCriticalSkills', 'technicalSkills'],
  },
  'PRACTICALITY CHECK': {
    title: 'PRACTICALITY CHECK',
    color: COLORS.violetLite,
    categories: ['practicalityCheck'],
  },
};

export const initialQuestionsState: IInitialQuestionsState = {
  questionList: [],
};

export const categoriesListForSection: Record<string, string[]> = {
  WIT: ['mySmarts'],
  GRIT: ['myPerformanceCharacter'],
  FIT: [
    'myValues',
    'myCareerAnchors',
    'myMBTI',
    'myHollandCode',
    'myIdealEnvironment',
  ],
  'MY SKILLS': ['coreCriticalSkills', 'technicalSkills'],
  'PRACTICALITY CHECK': ['practicalityCheck'],
};
