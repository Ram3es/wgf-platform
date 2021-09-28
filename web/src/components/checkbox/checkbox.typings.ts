type TFlexContent = 'flex-start' | 'flex-end' | 'center';

export interface ICheckboxProps {
  onChange(): void;
  isChecked: boolean;
  label: string;
  boxHeight?: number;
  boxWidth?: number;
  alignItems?: TFlexContent;
}

export type ICheckboxStyles = Partial<ICheckboxProps>;
