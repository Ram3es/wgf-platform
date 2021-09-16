import { ENDPOINTS } from '@constants/api';
import { POST } from './api';

export const postAnswers = (data: IAnswerReq[]) =>
  POST<{ message: string }, IAnswerReq[]>(
    `${ENDPOINTS.answers}/create-answers`,
    data
  );

export const getQuestions = (data: { quizId: string }) =>
  POST<IQuizResponse, { quizId: string }>(
    `${ENDPOINTS.quiz}/get-questions-by-quiz`,
    data
  );

export const getResults = (data: { quizId: string; userId: string }) =>
  POST<IResults, { quizId: string; userId: string }>(
    `${ENDPOINTS.quiz}/get-result-by-quiz`,
    data
  );

export const getPdf = (data: { quizId: string; userId: string }) =>
  POST<{ file: string; name: string }, { quizId: string; userId: string }>(
    `${ENDPOINTS.quiz}/get-pdf`,
    data
  );
