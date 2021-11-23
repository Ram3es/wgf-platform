import axios from 'axios';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { trackPromise } from 'react-promise-tracker';
import { useHistory } from 'react-router-dom';

import { useAppSelector } from '@services/hooks/redux';
import { useUpdateState } from '@services/hooks/useUpdateState';
import { getQuestions, postAnswers } from '@services/quiz.service';
import { storageService } from '@services/storage/storage';

import { errorMessage, unAutorizedError } from '@constants/pop-up-messages';
import { PROMISES_AREA } from '@constants/promises-area';
import { ROUTES } from '@constants/routes';
import {
    canvasQuiz, categoriesListForSection, initialQuestionsState
} from './canvas-quiz-page.constants';
import {
    QUESTION_SECTION_TITLES
} from './components/questions-navigation/questions-navigation.constants';

export const useCanvasQuizState = () => {
  const { state, updateState } = useUpdateState(initialQuestionsState);
  const [isFirst, setIsFirst] = useState(true);
  const [activeSection, setActiveSection] = useState('WIT');

  const setActiveItem = (item: string) => () => {
    setActiveSection(item);
  };

  const [completedSections, setCompletedSections] = useState<string[]>([]);

  const { push } = useHistory();

  storageService.setQuiz(canvasQuiz);

  const { user } = useAppSelector((state) => state);

  const checkComletedSections = (questionList: IQuestionListItem[]) => {
    QUESTION_SECTION_TITLES.forEach((section) => {
      const sectionList = questionList.filter((question) =>
        categoriesListForSection[section].includes(question.category)
      );

      const isAnswers = sectionList.every(
        (question) => question.answers[0]?.value
      );

      setCompletedSections((prev) =>
        isAnswers
          ? Array.from(new Set([...prev, section]))
          : prev.filter((item) => item !== section)
      );
    });
  };

  const createAnswersForInputRange = (
    questionList: IQuestionListItem[],
    categories: string[],
    value: string
  ) =>
    questionList.map((question) =>
      categories.includes(question.category)
        ? {
            ...question,
            answers: [
              {
                ...question.answers[0],
                value:
                  question.answers[0]?.value ||
                  question.category === 'myCareerAnchors'
                    ? 'Moderately Important'
                    : value,
              },
            ],
          }
        : question
    );

  const createQuestionList = useCallback(async () => {
    const listStorage = storageService.getQuestionList(canvasQuiz?.title || '');
    checkComletedSections(listStorage);

    if (listStorage.length < 1) {
      try {
        const { data } = await trackPromise(
          getQuestions({
            quizId: canvasQuiz?.id ?? '',
          }),
          PROMISES_AREA.getCaasQuestionList
        );

        checkComletedSections(data.questions);

        storageService.setQuestionList(data.questions, canvasQuiz?.title || '');
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
    }

    updateState({
      questionList: storageService.getQuestionList(canvasQuiz?.title || ''),
    });
  }, []);

  useEffect(() => {
    createQuestionList();
  }, [createQuestionList]);

  useEffect(() => {
    if (isFirst) {
      return setIsFirst(false);
    }

    storageService.setQuestionList(state.questionList, canvasQuiz?.title || '');
  }, [state.questionList]);

  const onSubmitSection = async () => {
    let listWithAnswers: IQuestionListItem[];
    switch (activeSection) {
      case 'WIT': {
        listWithAnswers = createAnswersForInputRange(
          state.questionList,
          ['mySmarts'],
          '5'
        );
        break;
      }
      case 'GRIT': {
        listWithAnswers = createAnswersForInputRange(
          state.questionList,
          ['myPerformanceCharacter'],
          '5'
        );
        break;
      }
      case 'FIT': {
        listWithAnswers = createAnswersForInputRange(
          state.questionList,
          ['myCareerAnchors', 'myHollandCode'],
          '3'
        );
        break;
      }
      default:
        listWithAnswers = state.questionList;
    }

    updateState({
      questionList: listWithAnswers,
    });

    const currentCompletedSections = Array.from(
      new Set([...completedSections, activeSection])
    );

    setCompletedSections(currentCompletedSections);

    const currentIndexSection = QUESTION_SECTION_TITLES.findIndex(
      (value) => value === activeSection
    );
    const nextSectionIndex = +currentIndexSection + 1;
    const status = currentCompletedSections.length * 20;

    try {
      await trackPromise(
        postAnswers(getAnswersRequestBody(listWithAnswers, status)),
        PROMISES_AREA.sendCanvasAnswers
      );
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

    if (
      activeSection ===
      QUESTION_SECTION_TITLES[QUESTION_SECTION_TITLES.length - 1]
    ) {
      return push(ROUTES.careerDesignCanvasResults);
    }

    setActiveSection(QUESTION_SECTION_TITLES[nextSectionIndex]);
  };

  const getAnswersRequestBody = (
    questionList: IQuestionListItem[],
    status: number
  ) => ({
    answers: questionList
      .filter((elem) => elem.answers[0]?.value)
      .map((item) => ({
        questionId: item.id,
        id: item.answers[0].id,
        value: item.answers[0].value,
        quizId: canvasQuiz?.id || '',
      })),
    status: status === 100 ? 'Completed' : `${status}%`,
  });

  const onChangeAnswer = (id: string, value: string) => {
    updateState((prev) => ({
      questionList: prev.questionList.map((item) => {
        if (item.id === id) {
          return {
            ...item,
            answers: [{ ...item.answers[0], value }],
          };
        }
        return item;
      }),
    }));
  };

  const questionListForSection = useMemo(
    () =>
      state.questionList.filter((question) =>
        categoriesListForSection[activeSection].includes(question.category)
      ),
    [state.questionList, activeSection]
  );

  return {
    ...state,
    updateState,
    user,
    completedSections,
    activeSection,
    setActiveItem,
    onSubmitSection,
    onChangeAnswer,
    questionListForSection,
  };
};
