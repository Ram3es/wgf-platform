import { ChangeEvent } from 'react';

export interface IWitProps {
  questionListForSection: IQuestionListItem[];
  onChangeRange: (id: string) => (event: ChangeEvent<HTMLInputElement>) => void;
  onSubmitSection: () => void;
}
