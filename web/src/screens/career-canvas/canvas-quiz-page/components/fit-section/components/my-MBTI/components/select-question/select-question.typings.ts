export interface ISelectQuestion {
  value: string;
  id: string;
  options: string[];
  onChangeAnswer: (id: string, value: string) => void;
}
