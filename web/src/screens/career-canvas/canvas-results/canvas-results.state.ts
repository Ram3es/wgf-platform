import { useState, useEffect } from 'react';
import { useHistory } from 'react-router';
import axios from 'axios';
import { trackPromise } from 'react-promise-tracker';

import { getQuestions } from '@services/quiz.service';
import { errorMessage, unAutorizedError } from '@constants/pop-up-messages';
import { PROMISES_AREA } from '@constants/promises-area';

import { canvasQuiz } from '../canvas-quiz-page/canvas-quiz-page.constants';

import { IResultQuestion } from './canvas-results.typing';

const INIT_CATEGORIES_MAP: Record<string, IResultQuestion[]> = {
  mySmarts: [],
  myPerformanceCharacter: [],
  myValues: [],
  myCareerAnchors: [],
  myMBTI: [],
  myHollandCode: [],
  myIdealEnvironment: [],
  coreCriticalSkills: [],
  technicalSkills: [],
  practicalityCheck: [],
};

const categorizeResults = (questionsArray: IQuestionListItem[]) => {
  const categoriesMap = { ...INIT_CATEGORIES_MAP };

  const sortedQuestions = [...questionsArray].sort(
    (first, second) => first.order - second.order
  );

  sortedQuestions.forEach((question) =>
    categoriesMap[question.category].push({
      title:
        question.category === 'mySmarts'
          ? question.subcategory || ''
          : question.title,
      value: question.answers[0]?.value,
      color: question.color,
    })
  );

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
