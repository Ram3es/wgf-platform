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
  isLabelTop?: boolean;
  labelFontSize?: string;
}

export interface ITextFieldProps extends ITextFieldStylesProps {
  value: string | number;
  type: string;
  name: string;
  tabIndex?: number;
  onChange?(
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ): void;
  onBlur?(
    event: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>
  ): void;
  autoCapitalize?: string;
  onClick?(): void;
  variant?: 'textarea' | 'input';
}
