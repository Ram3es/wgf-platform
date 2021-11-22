export interface IFitProps {
  questionListForSection: IQuestionListItem[];
  onChangeAnswer: (id: string, value: string) => void;
  onSubmitSection: () => void;
}
