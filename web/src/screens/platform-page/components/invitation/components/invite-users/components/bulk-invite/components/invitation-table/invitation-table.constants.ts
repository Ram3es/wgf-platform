import * as yup from 'yup';

import { REGEXPS } from '@constants/regexp';

export const InvitationTableFormSchema = yup.object().shape({
  users: yup.array().of(
    yup.object().shape({
      name: yup
        .string()
        .max(50, 'Too long name')
        .trim()
        .required("Enter user's name")
        .matches(REGEXPS.name, 'Please enter valid name'),
      email: yup
        .string()
        .max(50, 'Too long email')
        .trim()
        .required("Enter user's email")
        .matches(REGEXPS.email, 'Please enter valid email'),
    })
  ),
});
