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

type TRole = 'superAdmin' | 'trainerAdmin' | 'user';

interface IUser extends IProfileData {
  id: string;
  isSubscriber: boolean;
  role: TRole;
  jobStatus: string | null;
  avatar: string | null;
}

interface IProfileData {
  firstName: string;
  lastName: string;
  email: string;
  created: string;
  mobileNumber: string | null;
  organizationName: string | null;
  occupation: string | null;
  country: string | null;
}

interface IAccountData {
  newPassword: string;
  password: string;
  confirmPassword: string;
}

interface ISignInData {
  password: string;
  email: string;
}

interface ISignUpResponse {
  token: string;
  user: IUser;
}

interface IAnswerOption {
  id: string;
  text: string;
}

interface IQuestionListItem extends IQuestionRes {
  id: string;
  title: string;
  category: string;
  type: string;
  order: number;
  answers: IAnswer[];
  color?: string;
  isError?: boolean;
  subcategory?: string;
  placeholder?: string;
  answerOptions?: IAnswerOption[];
}

interface IAnswer {
  id?: string;
  value: string;
}

interface IAnswerReq extends IAnswer {
  questionId: string;
  quizId: string;
}

interface ICreateResult {
  answers: IAnswerReq[];
  status: string;
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
  careerCanvas: IQuizItem;
}

interface IQuizItem {
  questionList: IQuestionListItem[];
  currentPage: number;
  result: IResults;
  isLatestAnswers: boolean;
}

interface IUpdateResetedPassword {
  newPassword: string;
  token: string;
}

interface IUpdateProfilePassword {
  newPassword: string;
  password: string;
}

interface ITrainer extends Partial<IUser> {
  groupId: string;
  groupName: string;
}

interface IStudentFromTrainer {
  trainerId: string;
  userId: string;
}

type TInvitationType = 'user' | 'student' | 'trainer' | 'requestTrainer';
type TInvitationStatus = 'Pending' | 'Accepted' | 'Registration Pending';

interface IInvitation {
  id: string;
  inviteDate: Date;
  from: string;
  to: string;
  name: string | null;
  status: TInvitationStatus;
  type: TInvitationType;
}

interface IInvitationReq {
  to: string;
  name?: string;
  type: INVITATION_TYPE;
  groupId?: string;
}

interface IGroup {
  id: string;
  created: Date;
  name: string;
  trainerId: string;
}

interface ILocationState {
  from: {
    pathname: string;
  };
}
