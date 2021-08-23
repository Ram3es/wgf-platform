import { COLORS } from '@styles/colors';

import { IMAGES } from '@constants/images';

import { IRowItem } from './glance.typings';

export const headingItemsList = [
  {
    title: 'Optimistic Planner',
    imageHead: IMAGES.concernImage,
  },
  {
    title: 'Responsible Shaper',
    imageHead: IMAGES.controlImage,
  },
  {
    title: 'Inquisitive Explorer',
    imageHead: IMAGES.curiosityImage,
  },
  {
    title: 'Capable Overcomer',
    imageHead: IMAGES.confidenceImage,
  },
  {
    title: 'Social Collaborator',
    imageHead: IMAGES.cooperationImage,
  },
];

export const rowList = [
  'Your superpower is:',
  'Answers the question:',
  'Your self-assessment:',
  'What you can do:',
  'Maps to the Career Adaptability Scale',
];

export const getRowItemsList = (results: IResults): IRowItem[] => {
  return [
    {
      question: 'Do I have a future?',
      level: results.concern.level,
      description:
        'Be aware of upcoming educational and career options. Seek out career guidance professionals to get a quick start.',
      superPower: 'Planning',
      color: COLORS.greenLite,
      category: 'Concern',
    },
    {
      question: 'Who owns my future?',
      level: results.control.level,
      description:
        'Take responsibility for your career and get better at making decisions. Knowing yourself better helps.',
      superPower: 'Decision Making',
      color: COLORS.blue,
      category: 'Control',
    },
    {
      question: 'What will I do with my future?',
      level: results.curiosity.level,
      description:
        'Stay curious, ask questions and probe deeply into fields of interest. Use career tools to help you explore more effectively.',
      superPower: 'Exploring',
      color: COLORS.pink,
      category: 'Curiosity',
    },
    {
      question: 'Can I do it?',
      level: results.confidence.level,
      description:
        'Be confident of your abilities and keep working to improve them. Have a growth mindset and keep upskilling.',
      superPower: 'Problem Solving',
      color: COLORS.yellow,
      category: 'Confidence',
    },
    {
      question: 'Who can help me succeed?',
      level: results.cooperation.level,
      description:
        'Develop strong working relationships with collaborators. Be a team player, contributing proactively.',
      superPower: 'Collaborating',
      color: COLORS.violet,
      category: 'Cooperation',
    },
  ];
};
