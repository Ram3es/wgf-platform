import axios from 'axios';
import { useEffect, useState } from 'react';
import { trackPromise } from 'react-promise-tracker';
import { useHistory } from 'react-router';
import { useLocation } from 'react-router-dom';

import { IResultQuestion } from './canvas-results.typing';

import { useAppSelector } from '@services/hooks/redux';
import { getPdf, getQuestions } from '@services/quiz.service';

import { downloadMessage, errorMessage, unAutorizedError } from '@constants/pop-up-messages';
import { PROMISES_AREA } from '@constants/promises-area';
import { ROUTES } from '@constants/routes';
import { canvasQuiz } from '../career-canvas.constants';

const categorizeResults = (questionsArray: IQuestionListItem[]) => {
  const categoriesMap: Record<string, IResultQuestion[]> = {};

  const sortedQuestions = [...questionsArray].sort(
    (first, second) => first.order - second.order
  );

  sortedQuestions.forEach((question) => {
    if (!categoriesMap[question.category]) {
      categoriesMap[question.category] = [];
    }

    categoriesMap[question.category].push({
      title:
        question.category === 'mySmarts'
          ? question.subcategory || ''
          : question.title,
      value: question.answers[0]?.value,
      color: question.color,
      type: question.type,
    });
  });

  return categoriesMap;
};

export const useCanvasResults = () => {
  const [results, setResults] = useState<Record<string, IResultQuestion[]>>();
  const [filePdf, setFilePdf] = useState<null | IPdf>(null);

  const query = new URLSearchParams(useLocation().search);

  const { user } = useAppSelector((state) => state);

  const { push, replace } = useHistory();

  const quizId = canvasQuiz.id || query.get('quizId')!;
  const userId = user.id || query.get('userId')!;

  useEffect(() => {
    const request = async () => {
      if (!quizId || !userId) {
        return replace('/');
      }

      try {
        const { data } = await trackPromise(
          getQuestions({
            quizId,
            userId,
          }),
          PROMISES_AREA.getCaasQuestionList
        );

        const questionsArray = data.questions as IQuestionListItem[];
        const categorized = categorizeResults(questionsArray);

        setResults(categorized);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          if (error.response?.status === 401) {
            return unAutorizedError()
              .fire()
              .finally(() => push(ROUTES.signIn));
          }

          return errorMessage(error?.response?.data.message).fire();
        }
      }
    };

    request();
  }, []);

  const getPdfFile = async () => {
    if (!filePdf) {
      try {
        const { data } = await trackPromise(
          getPdf({
            userId,
            quizId,
          }),
          PROMISES_AREA.printCareerCanvasPdf
        );

        return data;
      } catch (error) {
        if (axios.isAxiosError(error)) {
          if (error.response?.status === 401) {
            unAutorizedError()
              .fire()
              .finally(() => push('/sign-in'));
          } else {
            errorMessage(error?.response?.data.message).fire();
          }

          return null;
        }
      }
    }

    return filePdf;
  };

  const generatePdf = async () => {
    const data = await getPdfFile();

    if (!data) return;

    setFilePdf(data);

    const html = `
        <p>A pdf file report was sent to your email.</p>
      `;
    downloadMessage(
      `data:application/pdf;base64,${data!.file}`,
      data!.name,
      html
    ).fire();
  };

  return { results, generatePdf };
};
