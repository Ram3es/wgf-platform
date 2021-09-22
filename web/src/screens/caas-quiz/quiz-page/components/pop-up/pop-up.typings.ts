import { TUpdateStateData } from '@services/hooks/useUpdateState';

import { IQuizState } from '../quiz/quiz.typings';

export interface IPopUpProps {
  user: IUser;
  setState(data: TUpdateStateData<IQuizState>): void;
}

export interface IUserRadioList {
  label: string;
  value: string;
}
