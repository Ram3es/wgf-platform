import { IResultState } from './result-page.typings';

export const initialResultState: IResultState = {
  results: {
    concern: {
      level: 'Low',
      score: 0,
    },
    confidence: {
      level: 'Low',
      score: 0,
    },
    control: {
      level: 'Low',
      score: 0,
    },
    curiosity: {
      level: 'Low',
      score: 0,
    },
    cooperation: {
      level: 'Low',
      score: 0,
    },
  },
  quiz: {
    id: '',
    title: '',
  },
  user: {
    id: '',
    firstName: '',
  },
};
