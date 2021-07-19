export interface IUserValues {
  id?: string;
  firstName: string;
  lastName: string;
  email: string;
  role?: string;
  isSubscriber: boolean;
}

export interface IFormState {
  currentPage: number;
  percent: number;
  questionPerPage: number;
  questionList: IQuestion[];
  questionListForPage: IQuestion[];
  user: IUserValues;
  isShowModal: boolean;
}
