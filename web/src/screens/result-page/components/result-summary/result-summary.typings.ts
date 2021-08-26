import { TLevelResult } from '@styles/colors';

export interface IResultSummaryProps {
  results: IResults;
  withArchetypesIcon?: boolean;
}

export interface IStarsIcon {
  [key: string]: {
    icon: string;
    count: number[];
  };
}

export interface IElementCategories {
  title: string;
  imageHead: string;
  score: number;
  imageBody: string;
  level: TLevelResult;
  description: string;
  superPower: string;
  colorTitle: string;
}
