export interface IResultSummaryProps {
  results: IResults;
}

export interface IStarsIconCount {
  [key: string]: number[];
}

export interface IElementCategories {
  title: string;
  imageHead: string;
  score: number;
  imageBody: string;
  level: string;
  starIcon: string;
  description: string;
}
