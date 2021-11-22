export interface IPracticalityCheckProps {
  questionListForSection: IQuestionListItem[];
  onChangeAnswer: (id: string, value: string) => void;
  onSubmitSection: () => void;
}
