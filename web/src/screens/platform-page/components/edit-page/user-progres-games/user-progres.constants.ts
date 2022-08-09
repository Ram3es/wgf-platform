export interface INAME_OF_QUIZ {
  quizes: Record<string, TQuiz>[];
}
export type TQuiz = { imgName: string; quizNameDB: string; pathResult: string };

export interface IResultUser {
  created: Date;
  quiz: Record<'title' | 'id', string>;
  status: string;
}

export const NAME_OF_QUIZ: INAME_OF_QUIZ = {
  quizes: [
    {
      CareerFlex: {
        imgName: 'CareerFlexBetterQuality',
        quizNameDB: 'caas-quiz',
        pathResult: '/career-flex/results',
      },
    },
    {
      'Career Flex Cooperation': {
        imgName: 'CareerFlexBetterQuality',
        quizNameDB: 'caas-cooperation-quiz',
        pathResult: '/career-flex/results',
      },
    },
    {
      'Career Design Canvas': {
        imgName: 'CareerDesignCanvasBetterQuality',
        quizNameDB: 'career-canvas',
        pathResult: '/career-canvas/results',
      },
    },
    {
      'Career Design Game': {
        imgName: 'CareerDesignGameBetterQuality',
        quizNameDB: 'N/A',
        pathResult: '',
      },
    },
    {
      'My Career Adventure': {
        imgName: 'MyCareerAdventureBetterQuality',
        quizNameDB: 'N/A',
        pathResult: '',
      },
    },
  ],
};
