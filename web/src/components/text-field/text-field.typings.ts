export interface ITextFieldStylesProps {
  error?: string;
  width?: string;
  height?: string;
  isFullWidth?: boolean;
  disabled?: boolean;
  placeholder?: string;
  readOnly?: boolean;
}

export interface ITextFieldProps extends ITextFieldStylesProps {
  value: string | number;
  type: string;
  name: string;
  tabIndex: number;
  onChange?(e: React.ChangeEvent<HTMLInputElement>): void;
  onBlur?(e: React.FocusEvent<HTMLInputElement>): void;
  autoCapitalize?: string;
}
