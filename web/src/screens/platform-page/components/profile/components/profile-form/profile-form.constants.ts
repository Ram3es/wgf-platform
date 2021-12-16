import * as yup from 'yup';

import { initialProfileData } from '../../profile.constants';

export const profileLabels: Record<string, string> = {
  email: '* Email',
  confirmPassword: '* Confirm Password',
  firstName: '* First Name',
  lastName: '* Last Name',
  organizationName: 'Organisation',
  occupation: 'Occupation',
  created: 'Joined on',
  mobileNumber: 'Mobile Number',
  country: 'Country',
};

export const ProfileFormItems = Object.keys(initialProfileData).filter(
  (item) => item !== 'country'
);

const phoneRegExp = /^(\+\d{1,3}[- ]?)?\d{10}$/;

export const ProfileFormSchema = yup.object().shape({
  firstName: yup.string().max(25).trim().required('This field cannot be empty'),
  lastName: yup.string().max(25).trim().required('This field cannot be empty'),
  email: yup
    .string()
    .max(50)
    .trim()
    .email('This field should be a email')
    .required('This field cannot be empty'),
  organisation: yup.string().nullable().max(50).trim(),
  occupation: yup.string().nullable().max(50).trim(),
  mobileNumber: yup
    .string()
    .matches(phoneRegExp, 'Phone number is not valid')
    .nullable(),
});
