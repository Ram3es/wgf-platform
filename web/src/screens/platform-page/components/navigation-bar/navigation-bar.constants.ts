import { COLORS } from '@styles/colors';

import { ROUTES } from '@constants/routes';

import { INavigationRoles } from './navigation-bar.typings';

const HOME_TABS = [
  {
    title: 'Dashboard',
    route: ROUTES.dashboard,
  },
  {
    title: 'History',
    route: ROUTES.history,
  },
  {
    title: 'Profile',
    route: ROUTES.profile,
  },
];
const ASSESSMENT_TABS = [
  {
    title: 'CareerFlex',
    route: ROUTES.careerFlex,
  },
  {
    title: 'CareerFlex+',
    route: ROUTES.careerFlex,
  },
  {
    title: 'Career Design Game',
    route: ROUTES.careerDesignGame,
  },
  {
    title: 'Career Design Canvas',
    route: ROUTES.careerDesignCanvas,
  },
  {
    title: 'My Career Adventure',
    route: ROUTES.myCareerAdventure,
  },
];
const ASSESSMENT_TABS_ADMIN = [
  {
    title: 'CareerFlex',
    route: ROUTES.careerFlexAdmin,
  },
  {
    title: 'CareerFlex+',
    route: ROUTES.careerFlexPlusAdmin,
  },
  {
    title: 'Career Design Game',
    route: ROUTES.careerDesignGame,
  },
  {
    title: 'Career Design Canvas',
    route: ROUTES.careerCanvasAdmin,
  },
  {
    title: 'My Career Adventure',
    route: ROUTES.myCareerAdventure,
  },
];

export const navigationRoles: INavigationRoles = {
  user: [
    {
      title: 'Home',
      items: [
        ...HOME_TABS,
        {
          title: 'Trainer',
          route: ROUTES.trainer,
        },
      ],
    },
    {
      title: 'Assessment',
      items: ASSESSMENT_TABS,
    },
  ],
  trainerAdmin: [
    {
      title: 'Home',
      items: HOME_TABS,
    },
    {
      title: 'Users',
      items: [
        {
          title: 'Invite Users',
          route: ROUTES.invitation,
        },
        {
          title: 'Manage Users',
          route: ROUTES.manageUser,
        },
        {
          title: 'Manage Group',
          route: ROUTES.manageGroup,
        },
      ],
    },
    {
      title: 'Assessment',
      items: ASSESSMENT_TABS_ADMIN,
    },
  ],
  superAdmin: [
    {
      title: 'Home',
      items: HOME_TABS,
    },
    {
      title: 'Users',
      items: [
        {
          title: 'Invite Users/Trainers',
          route: ROUTES.invitation,
        },
        {
          title: 'Manage Users',
          route: ROUTES.manageUser,
        },
        {
          title: 'Manage Trainers',
          route: ROUTES.manageTrainers,
        },
        {
          title: 'Manage Group',
          route: ROUTES.manageGroupSA,
        },
      ],
    },
    {
      title: 'Assessment',
      items: ASSESSMENT_TABS_ADMIN,
    },
  ],
};

export const sectionColors = {
  Home: COLORS.greenLight,
  Assessment: COLORS.pink,
  Users: COLORS.lightBlue,
};
