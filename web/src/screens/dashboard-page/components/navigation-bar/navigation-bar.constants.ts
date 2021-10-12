import { COLORS } from '@styles/colors';

import { INavigationRoles } from './navigation-bar.typings';

const HOME_TABS = ['Dashboard', 'History', 'Profile'];
const ASSESSMENT_TABS = [
  'CareerFlex',
  'Career Design Game',
  'Career Design Canvas',
  'My Career Adventure',
];

export const navigationRoles: INavigationRoles = {
  user: [
    {
      title: 'Home',
      items: [...HOME_TABS, 'Trainer'],
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
      items: ['Invite Users', 'Manage Users', 'Manage Group'],
    },
    {
      title: 'Assessment',
      items: ASSESSMENT_TABS,
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
        'Invite Users/Trainers',
        'Manage Users',
        'Manage Trainers',
        'Manage Group',
      ],
    },
    {
      title: 'Assessment',
      items: ASSESSMENT_TABS,
    },
  ],
};

export const sectionColors = {
  Home: COLORS.greenLite,
  Assessment: COLORS.pink,
  Users: COLORS.blue,
};
