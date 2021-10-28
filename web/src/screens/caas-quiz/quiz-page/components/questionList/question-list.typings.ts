import { TUpdateStateData } from '@services/hooks/useUpdateState';

import { IQuizState } from '../quiz/quiz.typings';

export interface IQuestionListProps {
  list: IQuestionListItem[];
  currentQuestionList: IQuestionListItem[];
  setState(data: TUpdateStateData<IQuizState>): void;
  errorRef: React.MutableRefObject<React.RefObject<HTMLDivElement>[]>;
  isShowLatestResult: boolean;
  isLatestAnswers: boolean;
  currentPage: number;
}
