import { ChangeEvent } from 'react';

export interface IStylesInputRangeProps {
  color: string;
  position: number;
  variant: 'label' | 'number';
}

export interface IInputRangeProps {
  value: number;
  color: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  minRange: number;
  maxRange: number;
  variant: 'label' | 'number';
}
