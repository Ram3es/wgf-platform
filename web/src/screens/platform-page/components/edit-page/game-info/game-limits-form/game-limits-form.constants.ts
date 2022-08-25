import { IInitialLimitsState } from './game-limits-form.typing';
import { exp30days } from '@constants/date';
import { REGEXPS } from '@constants/regexp';
import * as Yup from 'yup';

export const SelectState = {
  numberOfGames: false,
  playersPerGame: false,
  gameDuration: false,
  expirationDate: false,
};

export const initialLimitsState: IInitialLimitsState = {
  numberOfGames: '20',
  playersPerGame: '10',
  gamesUsed: '0',
  gameDuration: '1d 3h 20m',
  remainingGames: '-',
  expirationDate: exp30days(),
};

export const GameLimitsFormItems = Object.keys(initialLimitsState);

export const limitLabels = {
  numberOfGames: 'Total No. of Games',
  playersPerGame: 'Max. No. of Players per Game',
  gamesUsed: 'No. of Game(s) Used:',
  gameDuration: 'Max. Duration per Game',
  remainingGames: 'No. of Games Remaining',
  expirationDate: 'Game Limit Expiration Date',
};

export const LimitsFormSchema = Yup.object().shape({
  numberOfGames: Yup.string()
    .max(9)
    .trim()
    .required('This field is required ')
    .matches(REGEXPS.onlyNumbers, 'Must contain only numbers or unlimited'),

  playersPerGame: Yup.string()
    .max(9)
    .trim()
    .required('This field is required ')
    .matches(REGEXPS.onlyNumbers, 'Must contain only numbers or unlimited'),
  expirationDate: Yup.string()
    .trim()
    .required('This field is required ')
    .matches(REGEXPS.dateFormat, 'Please enter valid format date '),
  gameDuration: Yup.string()
    .trim()
    .required('This field is required ')
    .matches(
      REGEXPS.dayHoursMinute,
      'Please enter valid format time. Example: 1d 2h 5m'
    ),
});
