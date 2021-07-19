import { TUpdateStateData } from '@services/hooks/useUpdateState';

import { IFormState } from '../form/form.typings';

export interface IQuestionListProps {
  list: IQuestion[];
  currentQuestionList: IQuestion[];
  setState(data: TUpdateStateData<IFormState>): void;
  errorRef: React.MutableRefObject<React.RefObject<HTMLDivElement>[]>;
}
