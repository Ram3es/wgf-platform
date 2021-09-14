export interface ICheckboxProps {
  onChange(): void;
  isChecked: boolean;
  label: string;
  boxHeight?: number;
  boxWidth?: number;
}

export type ICheckboxStyles = Partial<ICheckboxProps>;
