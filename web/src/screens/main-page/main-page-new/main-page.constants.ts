import { ROUTES } from '@constants/routes';

export const MAIN_PAGE = {
  careerDesign: {
    title: 'Career Design Game',
    text: `Built on the foundation of our WITGRITFIT framework backed by
  decades of scientific research, the workshop is intended to
  provide career guidance and help participants discover their
  career goals.`,
  },
  careerCanvas: {
    title: 'Career Canvas',
    text: `Building on well-established academic theories, users kickstart
  their career design journey by filling up their WIT, GRIT and FIT
  on the Career Canvas.`,
  },
  careerFlex: {
    title: ' CareerFlex +',
    text: ` Building on decades of research, this CareerFlex quiz helps users
    identify their career adaptability superpowers, and shows them how
    to flex their career, bringing it to the next level. Users learn
    about how they fare in the 5 Career Adapt-abilities domains
    (includes the additional domain Cooperation).`,
  },
};
export interface IQuizRoutes {
  'career-canvas': string;
  'caas-cooperation-quiz': string;
}
export const QUIZ_PATH_NAME: IQuizRoutes = {
  'career-canvas': ROUTES.careerDesignCanvasResults,
  'caas-cooperation-quiz': ROUTES.careerFlexResults,
};
