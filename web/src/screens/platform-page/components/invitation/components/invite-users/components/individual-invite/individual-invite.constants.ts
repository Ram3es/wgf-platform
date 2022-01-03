import * as yup from 'yup';

import { REGEXPS } from '@constants/regexp';

import { IInitialIndividualInviteState } from './individual-invite.typings';

export const initialIndividualInviteState: IInitialIndividualInviteState = {
  firstName: '',
  lastName: '',
  email: '',
  groupType: 'User',
  assignGroup: 'Unassigned',
};

export const individualInviteLabels: Record<string, string> = {
  firstName: '* First Name',
  lastName: '* Last Name',
  email: '* Email',
};

export const individualInviteFormItems = Object.keys(individualInviteLabels);

export const groupTypeOptions = ['User', 'Trainer'];

export const IndividualInviteFormSchema = yup.object().shape({
  firstName: yup
    .string()
    .max(25)
    .trim()
    .required('This field cannot be empty')
    .matches(REGEXPS.name, 'Please enter valid name'),
  lastName: yup
    .string()
    .max(25)
    .trim()
    .required('This field cannot be empty')
    .matches(REGEXPS.name, 'Please enter valid surname'),
  email: yup
    .string()
    .max(50)
    .trim()
    .required('This field cannot be empty')
    .matches(REGEXPS.email, 'Please enter valid email'),
});
