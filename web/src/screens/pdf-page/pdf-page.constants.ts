import { IInitalState } from './pdf-page.typings';

export const initialState: IInitalState = {
  userId: '',
  quizTitle: '',
  quizId: '',
  userName: '',
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
};
