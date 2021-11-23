import { useState, useEffect } from 'react';
import { useHistory } from 'react-router';
import axios from 'axios';
import { trackPromise } from 'react-promise-tracker';

import { getQuestions } from '@services/quiz.service';
import { errorMessage, unAutorizedError } from '@constants/pop-up-messages';
import { PROMISES_AREA } from '@constants/promises-area';

import { canvasQuiz } from '../canvas-quiz-page/canvas-quiz-page.constants';

import { IResultQuestion } from './canvas-results.typing';

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

  const { push } = useHistory();

  useEffect(() => {
    const request = async () => {
      try {
        const { data } = await trackPromise(
          getQuestions({
            quizId: canvasQuiz?.id ?? '',
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
              .finally(() => push('/sign-in'));
          }

          return errorMessage(error?.response?.data.message).fire();
        }
      }
    };

    request();
  }, []);

  return { results };
};
