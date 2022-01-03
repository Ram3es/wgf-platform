import * as yup from 'yup';

export const InvitationTableFormSchema = yup.object().shape({
  users: yup.array().of(
    yup.object().shape({
      name: yup
        .string()
        .max(50, 'Too long name')
        .trim()
        .required("Enter user's name"),
      email: yup
        .string()
        .max(50, 'Too long email')
        .trim()
        .email('Enter valid email')
        .required("Enter user's email"),
    })
  ),
});
