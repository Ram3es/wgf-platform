export interface IPropsMyValues {
  questionList: IQuestionListItem[];
  onChangeAnswer: (id: string, value: string) => void;
}
