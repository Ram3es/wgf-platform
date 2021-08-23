export interface IModalProps {
  setIsOpen(value: boolean): void;
  title: string;
  text: string;
  withBackdrop?: boolean;
  width?: number;
}
