import { COLORS } from '@styles/colors';

export interface IRadioList {
  label: string;
  value: number;
  defaultChecked: boolean;
  color: string;
}

export const RADIO_LIST_QUIZ: IRadioList[] = [
  {
    label: 'NOT STRONG',
    value: 1,
    defaultChecked: false,
    color: COLORS.pink,
  },
  {
    label: 'SOMEWHAT STRONG',
    value: 2,
    defaultChecked: false,
    color: COLORS.yellow,
  },
  {
    label: 'STRONG',
    value: 3,
    defaultChecked: false,
    color: COLORS.grey,
  },
  {
    label: 'VERY STRONG',
    value: 4,
    defaultChecked: false,
    color: COLORS.greenLight,
  },
  {
    label: 'STRONGEST',
    value: 5,
    defaultChecked: false,
    color: COLORS.green,
  },
];
