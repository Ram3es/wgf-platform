export interface IDropDownStylesProps {
  isDisabled?: boolean;
  maxWidth?: string;
  maxHeight?: string;
  isFullWidth?: boolean;
}

export interface IDropDownProps extends IDropDownStylesProps {
  options: string[];
  selected?: string;
  setSelected: (selected: string) => void;
  setIsActive: (value: boolean) => void;
}
