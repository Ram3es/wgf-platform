export interface IRadioButtonProps {
  onChange(value: number | string): void;
  radioGroup: IRadioGroup[];
  isImage?: boolean;
  radioHeight?: string;
  radioWidth?: string;
  isVariantQuiz?: boolean;
  containerWidth?: string;
  initValue: number | string;
}

export interface IRadioButtonPropsStyles extends Partial<IRadioButtonProps> {
  checked?: boolean;
}

interface IRadioGroup {
  value: string | number;
  label: string;
  color?: string;
}
