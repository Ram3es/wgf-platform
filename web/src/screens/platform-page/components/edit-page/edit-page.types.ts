export interface ISelectionOption {
  [key: string]: { [key: string]: () => void }[];
}
