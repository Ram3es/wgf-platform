import { IInit } from './input-modal';

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

export interface IInputModalProps {
  children?: React.ReactNode;
  references: React.ForwardedRef<HTMLInputElement>;
  onChange: (e: React.MouseEvent, name: keyof IInit) => void;
  isChecked: boolean;
}
