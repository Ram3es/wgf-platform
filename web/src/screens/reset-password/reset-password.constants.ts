import * as yup from 'yup';

export const EmailFormSchema = yup.object().shape({
  email: yup
    .string()
    .max(50)
    .trim()
    .email('This field should be a email')
    .required('This field cannot be empty'),
});