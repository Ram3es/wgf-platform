import * as yup from 'yup';

import { initialAccountData } from '../../profile.constants';

export const accountLabels: Record<string, string> = {
  password: '* Current Password',
  newPassword: '* New Password',
  confirmPassword: '* Confirm Password',
};

export const AccountFormItems = Object.keys(initialAccountData);

export const AccountFormSchema = yup.object().shape({
  newPassword: yup
    .string()
    .required('This field cannot be empty')
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
      'Must Contain 8 Characters,Upper & Lower case,Number and special case Character'
    ),
  confirmPassword: yup
    .string()
    .required('This field cannot be empty')
    .oneOf([yup.ref('newPassword'), null], 'Passwords must match'),
  password: yup.string().required('This field cannot be empty').min(8),
});
