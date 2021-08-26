import { TLevelResult } from '@styles/colors';

export interface IQuickSummaryProps {
  results: IResults;
}

export interface IRowListItem {
  level: TLevelResult;
  description: string;
  superPower: string;
  category: string;
  question: string;
}

export type TRowList = keyof IRowListItem;

export interface IRow {
  title: string;
  rowName: TRowList;
}
