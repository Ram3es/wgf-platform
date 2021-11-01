export interface IQuizState {
  currentPage: number;
  percent: number;
  questionPerPage: number;
  questionList: IQuestionListItem[];
  questionListForPage: IQuestionListItem[];
  isShowModal: boolean;
  isShowLatestResult: boolean;
}
