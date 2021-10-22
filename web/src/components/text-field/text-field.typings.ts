export interface ITextFieldStylesProps {
  error?: string;
  minWidth?: number;
  height?: string;
  isFullWidth?: boolean;
  placeholder?: string;
  readOnly?: boolean;
  withBorder?: boolean;
  isAutoCompleteOff?: boolean;
  isSelect?: boolean;
  label?: string;
  isReadOnly?: boolean;
  isValue?: boolean;
}

export interface ITextFieldProps extends ITextFieldStylesProps {
  value: string | number;
  type: string;
  name: string;
  tabIndex?: number;
  onChange?(event: React.ChangeEvent<HTMLInputElement>): void;
  onBlur?(event: React.FocusEvent<HTMLInputElement>): void;
  autoCapitalize?: string;
  onClick?(): void;
}
