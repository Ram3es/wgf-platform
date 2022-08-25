type TFlexContent = 'flex-start' | 'flex-end' | 'center';

export interface ICheckboxProps {
  onChange: (e?: any) => void;
  isChecked: boolean;
  label: string;
  boxHeight?: number;
  boxWidth?: number;
  alignItems?: TFlexContent;
  isMonoColor?: boolean;
  noMargin?: boolean;
  name?: string;
}

export type ICheckboxStyles = Partial<ICheckboxProps>;
