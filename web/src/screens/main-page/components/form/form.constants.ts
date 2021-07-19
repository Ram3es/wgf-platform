import * as yup from 'yup';

import { QUESTION_INITIAL_STATE } from '@constants/question.initial';
import { SESSION_STORAGE } from '@constants/storage';

import { IFormState } from './form.typings';

export const initialState: IFormState = {
  currentPage:
    JSON.parse(sessionStorage.getItem(SESSION_STORAGE.currentPage)!) || 1,
  questionPerPage: 7,
  questionList:
    JSON.parse(sessionStorage.getItem(SESSION_STORAGE.questionList)!) ||
    QUESTION_INITIAL_STATE,
  questionListForPage: [],
  percent: 0,
  isShowModal: false,
  user: JSON.parse(sessionStorage.getItem(SESSION_STORAGE.user)!) || {
    firstName: '',
    lastName: '',
    email: '',
    isSubscriber: false,
  },
};

export const UserFormSchema = yup.object().shape({
  firstName: yup.string().trim().required('This field cannot be empty'),
  lastName: yup.string().trim().required('This field cannot be empty'),
  email: yup
    .string()
    .trim()
    .email('This field should be a email')
    .required('This field cannot be empty'),
});
