export interface IWitProps {
  questionListForSection: IQuestionListItem[];
  onChangeAnswer: (id: string, value: string) => void;
  onSubmitSection: () => void;
}
