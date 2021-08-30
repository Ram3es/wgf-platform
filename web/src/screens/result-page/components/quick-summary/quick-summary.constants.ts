import { COLORS } from '@styles/colors';

import { IMAGES } from '@constants/images';

import { IRow, IRowListItem } from './quick-summary.typings';

export const headingItemsList = [
  {
    title: 'Optimistic Planner',
    imageHead: IMAGES.concernImage,
    color: COLORS.default,
  },
  {
    title: 'Responsible Shaper',
    imageHead: IMAGES.controlImage,
    color: COLORS.white,
  },
  {
    title: 'Inquisitive Explorer',
    imageHead: IMAGES.curiosityImage,
    color: COLORS.white,
  },
  {
    title: 'Capable Overcomer',
    imageHead: IMAGES.confidenceImage,
    color: COLORS.default,
  },
  {
    title: 'Social Collaborator',
    imageHead: IMAGES.cooperationImage,
    color: COLORS.white,
  },
];

export const rowList: IRow[] = [
  {
    title: 'Your superpower is:',
    rowName: 'superPower',
  },
  {
    title: 'Answers the question:',
    rowName: 'question',
  },
  {
    title: 'Your self-assessment:',
    rowName: 'level',
  },
  {
    title: 'What you can do:',
    rowName: 'description',
  },
  {
    title: 'Maps to the Career Adaptability Scale',
    rowName: 'category',
  },
];

export const getRowItemsList = (results: IResults): IRowListItem[] => {
  return [
    {
      question: 'Do I have a future?',
      level: results.concern.level,
      description:
        'Be aware of upcoming educational and career options. Seek out career guidance professionals to get a quick start.',
      superPower: 'Planning',
      category: 'Concern',
    },
    {
      question: 'Who owns my future?',
      level: results.control.level,
      description:
        'Take responsibility for your career and get better at making decisions. Knowing yourself better helps.',
      superPower: 'Decision Making',
      category: 'Control',
    },
    {
      question: 'What will I do with my future?',
      level: results.curiosity.level,
      description:
        'Stay curious, ask questions and probe deeply into fields of interest. Use career tools to help you explore more effectively.',
      superPower: 'Exploring',
      category: 'Curiosity',
    },
    {
      question: 'Can I do it?',
      level: results.confidence.level,
      description:
        'Be confident of your abilities and keep working to improve them. Have a growth mindset and keep upskilling.',
      superPower: 'Problem Solving',
      category: 'Confidence',
    },
    {
      question: 'Who can help me succeed?',
      level: results.cooperation.level,
      description:
        'Develop strong working relationships with collaborators. Be a team player, contributing proactively.',
      superPower: 'Collaborating',
      category: 'Cooperation',
    },
  ];
};