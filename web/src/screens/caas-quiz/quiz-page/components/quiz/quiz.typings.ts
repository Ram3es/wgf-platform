export interface IQuizState {
  currentPage: number;
  percent: number;
  questionPerPage: number;
  questionList: IQuestionListItem[];
  questionListForPage: IQuestionListItem[];
  user: IUser | null;
  isShowModal: boolean;
}
