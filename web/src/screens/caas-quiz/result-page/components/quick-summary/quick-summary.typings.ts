import { TLevelResult } from '@styles/colors';

export interface IQuickSummaryProps {
  results: IResults;
  quiz: string;
}

export interface IRowListItem {
  level: TLevelResult;
  description: string;
  superPower: string;
  category: string;
  question: string;
}

export interface IHeadingItem {
  title: string;
  imageHead: string;
  color: string;
}

export type TRowList = keyof IRowListItem;

export interface IRow {
  title: string;
  rowName: TRowList;
}
