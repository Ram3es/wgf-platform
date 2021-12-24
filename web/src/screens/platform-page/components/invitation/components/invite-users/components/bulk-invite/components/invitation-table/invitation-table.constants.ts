import * as yup from 'yup';

export const InvitationTableFormSchema = yup.object().shape({
  name: yup
    .string()
    .max(50, 'Too long name')
    .trim()
    .required('This field cannot be empty'),
  email: yup
    .string()
    .max(50, 'Too long email')
    .trim()
    .email('This field should be a email')
    .required('This field cannot be empty'),
});
