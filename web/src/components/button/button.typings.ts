export type TButtonVariant = 'primary' | 'secondary';

export interface IButtonStylesProps {
  variant?: TButtonVariant;
  isDisabled?: boolean;
  isFullWidth?: boolean;
  color?: string;
  image?: 'back' | 'next';
}

export interface IButtonProps extends IButtonStylesProps {
  title: string;
  onClick(): void;
  type?: TByttonTypes;
}

type TByttonTypes = 'button' | 'submit' | 'reset';
