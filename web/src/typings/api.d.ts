interface ICategory {
  score: number;
  level: TLevels;
}

type TLevels = 'Low' | 'Moderate' | 'High';

interface IResults {
  concern: ICategory;
  control: ICategory;
  curiosity: ICategory;
  confidence: ICategory;
  cooperation?: ICategory;
}

interface IPostResponce {
  user: IUser;
  results: IResults;
}

interface IUserSignUp {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

interface IUserUpdate extends Partial<IUser> {
  id: string;
}

interface IUser {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  created: Date;
  isSubscriber: boolean;
  trainerAdminId: string | null;
  role: string;
  jobStatus: string | null;
}

interface ISignInData {
  password: string;
  email: string;
}

interface ISignUpResponse {
  token: string;
  user: IUser;
}

interface IQuestionListItem extends IQuestionRes {
  id: string;
  title: string;
  category: string;
  type: string;
  order: number;
  answers: IAnswerRes[];
  isError?: boolean;
}

interface IAnswer {
  id: string;
  value: string;
}

interface IAnswerReq extends IAnswer {
  questionId: string;
  quizId: string;
}

interface IQuiz {
  id: string;
  title: string;
}

interface IQuizResponse extends IQuiz {
  questions: IQuestionRes[];
}

interface IQuizRequest {
  quizId: string;
  userId: string;
}

interface IQuizItems {
  caas: IQuizItem;
  caasCooperation: IQuizItem;
}

interface IQuizItem {
  questionList: IQuestionListItem[];
  currentPage: number;
  result: IResults;
}

interface IUpdatePassword {
  email: string;
  newPassword: string;
  token: string;
}
