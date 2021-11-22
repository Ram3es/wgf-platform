export interface IPropsMyMBTI {
  questionList: IQuestionListItem[];
  onChangeAnswer: (id: string, value: string) => void;
}
