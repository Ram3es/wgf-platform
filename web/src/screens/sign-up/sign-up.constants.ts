import * as yup from 'yup';

import { REGEXPS } from '@constants/regexp';

export const initialSignUp = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
};

export const initialSignUpState: IUserSignUp = initialSignUp;

export const UserFormSchema = yup.object().shape({
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
  password: yup
    .string()
    .required('This field cannot be empty')
    .matches(
      REGEXPS.password,
      'Must Contain 8 Characters,Upper & Lower case,Number and special case Character'
    ),
  email: yup
    .string()
    .max(50)
    .trim()
    .required('This field cannot be empty')
    .matches(REGEXPS.email, 'Please enter valid email'),
});
