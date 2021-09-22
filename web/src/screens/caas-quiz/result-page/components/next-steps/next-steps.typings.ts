import { TLevelResult } from '@styles/colors';

export interface INextStepsProps {
  results: IResults;
}

export interface IStepsCategorie {
  title: string;
  level: TLevelResult;
  description: string[];
  color: string;
}

export interface IRecomendationMessage {
  [key: string]: string;
}
