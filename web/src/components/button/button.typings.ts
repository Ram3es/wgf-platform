export type TButtonVariant = 'primary' | 'text' | 'cancel';

export interface IButtonStylesProps {
  variant?: TButtonVariant;
  isDisabled?: boolean;
  isFullWidth?: boolean;
  minWidth?: number;
  color?: string;
  image?: 'back' | 'next';
}

export interface IButtonProps extends IButtonStylesProps {
  title: string;
  onClick(): void;
  type?: TByttonTypes;
}

type TByttonTypes = 'button' | 'submit' | 'reset';
