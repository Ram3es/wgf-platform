interface IAnswer {
  questionNumber: number;
  answerValue: number;
}

interface ICategory {
  score: number;
  level: string;
}

interface IQuestion {
  questionNumber: number;
  title: string;
  answerValue?: number;
  isError?: boolean;
}

interface IResults {
  concern: ICategory;
  control: ICategory;
  curiosity: ICategory;
  confidence: ICategory;
  cooperation: ICategory;
}

interface IPostResponce {
  user: IUser;
  results: IResults;
}

interface IUserCreate {
  firstName: string;
  lastName: string;
  email: string;
  isSubscriber: boolean;
  answers: IAnswer[];
}

interface IUserUpdate extends Partial<IUserCreate> {
  role?: string;
}

interface IUser extends IUserCreate {
  id: string;
}
