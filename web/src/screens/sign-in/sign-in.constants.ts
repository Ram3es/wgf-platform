import * as yup from 'yup';

import { REGEXPS } from '@constants/regexp';

import { ISignInState } from './sign-in.typings';

export const initialSignInData = {
  email: '',
  password: '',
};

export const initialSignInState: ISignInState = {
  signInData: initialSignInData,
  isRemember: false,
};

export const LoginFormSchema = yup.object().shape({
  password: yup
    .string()
    .max(50)
    .min(8)
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
