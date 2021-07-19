export interface INextStepsProps {
  results: IResults;
}

export interface IStepsCategorie {
  title: string;
  level: string;
  description: string;
  color: string;
}

export interface IRecomendationMessage {
  [key: string]: string;
}
