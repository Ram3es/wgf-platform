import * as yup from 'yup';

export const initialLoginData = {
  email: '',
  password: '',
};

export const LoginFormSchema = yup.object().shape({
  password: yup.string().max(50).required('This field cannot be empty'),
  email: yup
    .string()
    .max(50)
    .trim()
    .email('This field should be a email')
    .required('This field cannot be empty'),
});
