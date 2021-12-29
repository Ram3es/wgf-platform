import * as yup from 'yup';

export const TrainerRequestFormSchema = yup.object().shape({
  email: yup
    .string()
    .max(50)
    .trim()
    .email('This field should be an email')
    .required('This field cannot be empty'),
});
