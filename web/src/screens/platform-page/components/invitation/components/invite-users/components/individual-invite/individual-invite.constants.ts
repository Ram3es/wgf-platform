import * as yup from 'yup';

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
  firstName: yup.string().max(25).trim().required('This field cannot be empty'),
  lastName: yup.string().max(25).trim().required('This field cannot be empty'),
  email: yup
    .string()
    .max(50)
    .trim()
    .email('This field should be a email')
    .required('This field cannot be empty'),
});
