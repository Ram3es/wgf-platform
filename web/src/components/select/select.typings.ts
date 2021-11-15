export interface ISelectProps {
  placeholder: string;
  label: string;
  options: ISelectOption[];
  selected: ISelectOption[];
  onBlur: () => void;
  setSelected: React.Dispatch<React.SetStateAction<ISelectOption[]>>;
  maxSelected?: number;
  error?: string;
}

export interface ISelectOption {
  value: string;
  label: string;
}
