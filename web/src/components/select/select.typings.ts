export interface ISelectStylesProps {
  isDisabled?: boolean;
  maxWidth?: string;
  maxHeight?: string;
  isFullWidth?: boolean;
}

export interface ISelectProps extends ISelectStylesProps {
  options: string[];
  selected?: string;
  setSelected: (selected: string) => void;
  setIsActive: (value: boolean) => void;
}
