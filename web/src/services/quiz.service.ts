import { ENDPOINTS } from '@constants/api';
import { POST } from './api';

export const postAnswers = (data: ICreateResult) =>
  POST<{ message: string }, ICreateResult>(
    `${ENDPOINTS.answers}/create-answers`,
    data
  );

export const getQuestions = (data: { quizId: string; userId: string }) =>
  POST<IQuizResponse, { quizId: string; userId: string }>(
    `${ENDPOINTS.quiz}/get-questions-by-quiz`,
    data
  );

export const getResults = (data: IQuizRequest) =>
  POST<IResults, IQuizRequest>(`${ENDPOINTS.quiz}/get-result-by-quiz`, data);

export const getPdf = (data: IQuizRequest) =>
  POST<{ file: string; name: string }, IQuizRequest>(
    `${ENDPOINTS.quiz}/get-pdf`,
    data
  );
export const getCsv = (data: { quizId: string }) =>
  POST<{ file: string }, { quizId: string }>(`${ENDPOINTS.quiz}/get-csv`, data);
