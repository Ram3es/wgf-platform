export interface INAME_OF_QUIZ {
  quizes: Record<string, string>[];
  title: Record<string, string>;
}
export interface IResultUser {
  created: Date;
  quiz: { title: string };
  status: string;
}

export const NAME_OF_QUIZ: INAME_OF_QUIZ = {
  quizes: [
    { CareerFlex: 'CareerFlexBetterQuality' },
    { 'Career Flex Cooperation': 'CareerFlexBetterQuality' },
    { 'Career Design Canvas': 'CareerDesignCanvasBetterQuality' },
    { 'Career Design Game': 'CareerDesignGameBetterQuality' },
    { 'My Career Adventure': 'MyCareerAdventureBetterQuality' },
  ],
  title: {
    CareerFlex: 'caas-quiz',
    'Career Flex Cooperation': 'caas-cooperation-quiz',
    'Career Design Canvas': 'career-canvas',
    'Career Design Game': 'aaaaaaa',
    'My Career Adventure': 'aaaaaaaaaaa',
  },
};
