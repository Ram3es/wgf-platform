import { FLEX_QUIZ } from '@constants/flex-quiz';

const CAREER_FLEX = {
  btnTitle: { csv: 'Export all user data', game: 'Enter CareerFlex' },
  titleHeader: 'CareerFlex',
  text: 'Building on decades of research, this CareerFlex quiz helps users identify their career adaptability superpowers, and shows them how to flex their career, bringing it to the next level. Users learn about how they fare in the 4 Career Adapt-abilities domains.  ',
};
const CAREER_FLEX_PLUS = {
  btnTitle: { csv: 'Export all user data', game: 'Enter CareerFlex +' },
  titleHeader: 'CareerFlex +',
  text: 'Building on decades of research, this CareerFlex quiz helps users identify their career adaptability superpowers, and shows them how to flex their career, bringing it to the next level. Users learn about how they fare in the 5 Career Adapt-abilities domains (includes the additional domain Cooperation).',
};

export const getPageParameters = (path: string) => {
  switch (path) {
    case '/platform/career-flex-admin':
      return { ...FLEX_QUIZ.careerFlex, ...CAREER_FLEX };
    case '/platform/career-flex-plus-admin':
      return { ...FLEX_QUIZ.careerFlexPlus, ...CAREER_FLEX_PLUS };
    default:
      return { ...FLEX_QUIZ.careerFlex, ...CAREER_FLEX };
  }
};
