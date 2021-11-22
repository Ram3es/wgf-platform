export interface ISelectProps {
  placeholder: string;
  label: string;
  options: ISelectOption[];
  selected: ISelectOption[];
  setSelected: (selected: ISelectOption[]) => void;
  onBlur?: () => void;
  maxSelected?: number;
  error?: string;
}

export interface ISelectOption {
  value: string;
  label: string;
}
