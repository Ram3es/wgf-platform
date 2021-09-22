import * as yup from 'yup';

import { ISignInState } from './sign-in.typings';

export const initialSignInData = {
  email: '',
  password: '',
};

export const initialSignInState: ISignInState = {
  signInData: initialSignInData,
  user: null,
  isRemember: false,
};

export const LoginFormSchema = yup.object().shape({
  password: yup.string().max(50).min(8).required('This field cannot be empty'),
  email: yup
    .string()
    .max(50)
    .trim()
    .email('This field should be a email')
    .required('This field cannot be empty'),
});
