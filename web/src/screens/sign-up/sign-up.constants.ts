import * as yup from 'yup';

export const initialUser = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
};

export const UserFormSchema = yup.object().shape({
  firstName: yup.string().max(25).trim().required('This field cannot be empty'),
  lastName: yup.string().max(25).trim().required('This field cannot be empty'),
  password: yup
    .string()
    .required('This field cannot be empty')
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
      'Must Contain 8 Characters, Uppercase, Lowercase,Number and special case Character'
    ),
  email: yup
    .string()
    .max(50)
    .trim()
    .email('This field should be a email')
    .required('This field cannot be empty'),
});
