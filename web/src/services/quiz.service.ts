import { ENDPOINTS } from '@constants/api';
import { IInitialLimitsState } from '@screens/platform-page/components/edit-page/game-info/game-limits-form';
import { POST, GET } from './api';

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
export const getCaasCsv = (data: { quizId: string }) =>
  POST<{ file: string }, { quizId: string }>(
    `${ENDPOINTS.quiz}/get-caas-csv`,
    data,
    80000
  );

export const getCareerCanvasCsv = (data: { quizId: string }) =>
  POST<{ file: string }, { quizId: string }>(
    `${ENDPOINTS.quiz}/get-career-canvas-csv`,
    data
  );

export const getLimitTrainer = (id: string) =>
  GET<IInitialLimitsState>(`${ENDPOINTS.game}/get-limits/${id}`);

export const setLimitTrainer = (data: Partial<IInitialLimitsState>) => {
  return POST<void, Partial<IInitialLimitsState>>(
    `${ENDPOINTS.game}/set-limits`,
    data
  );
};
