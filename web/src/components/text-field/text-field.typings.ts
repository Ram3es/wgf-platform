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
  onChange?(event: React.ChangeEvent<HTMLInputElement>): void;
  onBlur?(event: React.FocusEvent<HTMLInputElement>): void;
  autoCapitalize?: string;
}
