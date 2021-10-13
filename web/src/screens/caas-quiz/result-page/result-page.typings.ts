export interface IResultState {
  results: IResults;
  quiz: IQuiz;
  user: {
    id: string;
    firstName: string;
  };
}

export interface IPdf {
  file: string;
  name: string;
}
