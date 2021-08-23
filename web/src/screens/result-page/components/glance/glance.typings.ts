import { TLevelResult } from '@styles/colors';

export interface IGlanceProps {
  results: IResults;
}

export interface IRowItem {
  level: TLevelResult;
  description: string;
  superPower: string;
  color: string;
  category: string;
  question: string;
}
