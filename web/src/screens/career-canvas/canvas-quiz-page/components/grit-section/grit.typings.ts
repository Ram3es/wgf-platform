import { ChangeEvent } from 'react';

export interface IGritProps {
  questionListForSection: IQuestionListItem[];
  onChangeRange: (id: string) => (event: ChangeEvent<HTMLInputElement>) => void;
  onSubmitSection: () => void;
}
