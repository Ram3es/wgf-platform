import * as yup from 'yup';

import { REGEXPS } from '@constants/regexp';

export const updatePasswordInitial = {
  email: '',
  newPassword: '',
  confirmPassword: '',
};

export const UpdatePasswordFormSchema = yup.object().shape({
  newPassword: yup
    .string()
    .required('This field cannot be empty')
    .matches(
      REGEXPS.password,
      'Must Contain 8 Characters,Upper & Lower case,Number and special case Character'
    ),
  confirmPassword: yup
    .string()
    .required('This field cannot be empty')
    .oneOf([yup.ref('newPassword'), null], 'Passwords must match'),
});
