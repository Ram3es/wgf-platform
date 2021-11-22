export interface IGritProps {
  questionListForSection: IQuestionListItem[];
  onChangeAnswer: (id: string, value: string) => void;
  onSubmitSection: () => void;
}
