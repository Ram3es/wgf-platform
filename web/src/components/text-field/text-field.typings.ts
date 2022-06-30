export interface ITextFieldStylesProps {
  error?: string;
  minWidth?: number;
  height?: string;
  isFullWidth?: boolean;
  placeholder?: string;
  withBorder?: boolean;
  isAutoCompleteOff?: boolean;
  isSelect?: boolean;
  label?: string;
  isReadOnly?: boolean;
  isValue?: boolean;
  isLabelTop?: boolean;
  labelFontSize?: string;
  maxLength?: number;
  isTableReadOnly?: boolean;
  colorGrey?: boolean;
  isEditMode?: boolean;
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
  showSelect?: (param: Record<string, boolean>) => void;
  isShowSelect?: Record<string, boolean>;
  setUnlimited?: (name: string) => void;
}
