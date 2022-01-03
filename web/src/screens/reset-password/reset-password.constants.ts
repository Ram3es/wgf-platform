import * as yup from 'yup';

import { REGEXPS } from '@constants/regexp';

export const EmailFormSchema = yup.object().shape({
  email: yup
    .string()
    .max(50)
    .trim()
    .required('This field cannot be empty')
    .matches(REGEXPS.email, 'Please enter valid email'),
});
