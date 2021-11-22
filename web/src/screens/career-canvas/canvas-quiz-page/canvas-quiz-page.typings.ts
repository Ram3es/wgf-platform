import { QUESTION_SECTIONS } from './canvas-quiz-page.constants';

export type TQuestionSections = keyof typeof QUESTION_SECTIONS;

export interface IInitialQuestionsState {
  questionList: IQuestionListItem[];
}

export type TSections =
  | 'WIT'
  | 'FIT'
  | 'GRIT'
  | 'MY SKILLS'
  | 'PRACTICALITY CHECK';
