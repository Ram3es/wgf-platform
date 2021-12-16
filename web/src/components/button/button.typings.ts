export type TButtonVariant = 'primary' | 'text' | 'cancel' | 'underline';

export interface IButtonStylesProps {
  variant?: TButtonVariant;
  isDisabled?: boolean;
  isFullWidth?: boolean;
  minWidth?: number;
  color?: string;
  iconType?: string;
  isIconRight?: boolean;
  borderRadius?: string;
}

export interface IButtonProps extends IButtonStylesProps {
  title: string;
  onClick(): void;
  type?: TButtonTypes;
}

type TButtonTypes = 'button' | 'submit' | 'reset';
