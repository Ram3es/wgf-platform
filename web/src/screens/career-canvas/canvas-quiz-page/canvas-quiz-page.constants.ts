import { COLORS } from '@styles/colors';

import { IInitialQuestionsState } from './canvas-quiz-page.typings';

export const QUESTION_SECTIONS = {
  WIT: { title: 'WIT', color: COLORS.greenLite, categories: ['mySmarts'] },
  GRIT: {
    title: 'GRIT',
    color: COLORS.blue,
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
} as const;

export const initialQuestionsState: IInitialQuestionsState = {
  questionList: [],
  questionListForSection: [],
};

export const canvasQuiz = {
  id: 'bd4bc168-77a5-4ea9-975b-16d1eebef55f',
  title: 'career-canvas',
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
