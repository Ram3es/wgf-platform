export interface IMySkillsProps {
  questionListForSection: IQuestionListItem[];
  onChangeAnswer: (id: string, value: string) => void;
  onSubmitSection: () => void;
}
