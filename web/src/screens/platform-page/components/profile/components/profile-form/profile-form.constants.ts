import * as yup from 'yup';

import { REGEXPS } from '@constants/regexp';
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

export const ProfileFormSchema = yup.object().shape({
  firstName: yup
    .string()
    .max(25)
    .trim()
    .required('This field cannot be empty')
    .matches(REGEXPS.name, 'Please enter valid name'),
  lastName: yup
    .string()
    .max(25)
    .trim()
    .required('This field cannot be empty')
    .matches(REGEXPS.name, 'Please enter valid surname'),
  email: yup
    .string()
    .max(50)
    .trim()
    .required('This field cannot be empty')
    .matches(REGEXPS.email, 'Please enter valid email'),
  organisation: yup
    .string()
    .nullable()
    .max(50)
    .trim()
    .matches(REGEXPS.name, 'Enter valid organization'),
  occupation: yup
    .string()
    .nullable()
    .max(50)
    .trim()
    .matches(REGEXPS.name, 'Enter valid occupation'),
  mobileNumber: yup
    .string()
    .matches(REGEXPS.phone, 'Phone number is not valid')
    .nullable(),
});
