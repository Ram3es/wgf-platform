import * as yup from 'yup';

import { ISignUpState } from './sign-up.typings';

export const initialSignUp = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
};

export const initialSignUpState: ISignUpState = {
  signUpData: initialSignUp,
  user: null,
};

export const UserFormSchema = yup.object().shape({
  firstName: yup.string().max(25).trim().required('This field cannot be empty'),
  lastName: yup.string().max(25).trim().required('This field cannot be empty'),
  password: yup
    .string()
    .required('This field cannot be empty')
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
      'Must Contain 8 Characters,Upper & Lower case,Number and special case Character'
    ),
  email: yup
    .string()
    .max(50)
    .trim()
    .email('This field should be a email')
    .required('This field cannot be empty'),
});
