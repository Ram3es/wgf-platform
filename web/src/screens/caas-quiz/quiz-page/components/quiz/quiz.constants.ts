import { IQuizState } from './quiz.typings';

export const initialState: IQuizState = {
  currentPage: 1,
  questionPerPage: 7,
  questionList: [],
  questionListForPage: [],
  percent: 0,
  isShowModal: false,
};
