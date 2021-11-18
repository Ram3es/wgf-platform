import axios from 'axios';
import { ChangeEvent, useCallback, useEffect, useState } from 'react';
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

  const createAnswersForInputRange = (questionList: IQuestionListItem[]) => {
    return questionList.map((question) => {
      switch (question.category) {
        case 'myPerformanceCharacter':
        case 'mySmarts': {
          return {
            ...question,
            answers: [
              {
                ...question.answers[0],
                value: question.answers[0]?.value || '5',
              },
            ],
          };
        }
        case 'myCareerAnchors':
        case 'myHollandCode': {
          return {
            ...question,
            answers: [
              {
                ...question.answers[0],
                value: question.answers[0]?.value || '3',
              },
            ],
          };
        }
        default:
          return question;
      }
    });
  };

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
    updateState({
      questionListForSection: state.questionList.filter((question) =>
        categoriesListForSection[activeSection].includes(question.category)
      ),
    });
  }, [state.questionList, activeSection]);

  useEffect(() => {
    if (isFirst) {
      return setIsFirst(false);
    }

    storageService.setQuestionList(state.questionList, canvasQuiz?.title || '');
  }, [state.questionList]);

  const handleError = (questionList: IQuestionListItem[]) => {
    const errorList = questionList.map((elem) => ({
      ...elem,
      isError: !elem.answers[0]?.value,
    }));

    const currentList = errorList.filter((question) =>
      categoriesListForSection[activeSection].includes(question.category)
    );

    updateState({
      questionListForSection: currentList,
      questionList: errorList,
    });

    const isError = currentList.some((elem) => elem.isError);

    return isError;
  };

  const onSubmitSection = () => {
    const listWithAnswers = createAnswersForInputRange(state.questionList);

    updateState({
      questionList: listWithAnswers,
    });

    if (handleError(listWithAnswers)) {
      return;
    }

    setCompletedSections((prev) => [...prev, activeSection]);

    const currentIndexSection = QUESTION_SECTION_TITLES.findIndex(
      (value) => value === activeSection
    );
    const nextSectionIndex = +currentIndexSection + 1;

    setActiveSection(QUESTION_SECTION_TITLES[nextSectionIndex]);
  };

  const onSubmitLastSection = async () => {
    if (handleError(state.questionList)) {
      return;
    }

    updateState({
      questionList: state.questionList.map((elem) => ({
        ...elem,
        isError: false,
      })),
    });

    try {
      await trackPromise(
        postAnswers(getAnswersRequestBody()),
        PROMISES_AREA.sendCaasAnswers
      );

      return;
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

  const getAnswersRequestBody = () => ({
    answers: state.questionList.map((item) => ({
      questionId: item.id,
      id: item.answers[0].id,
      value: item.answers[0].value,
      quizId: storageService.getQuiz()?.id || '',
    })),
    status: 'Completed',
  });

  const onChangeRange =
    (id: string) => (event: ChangeEvent<HTMLInputElement>) => {
      updateState((prev) => ({
        questionList: prev.questionList.map((item) => {
          if (item.id === id) {
            return {
              ...item,
              answers: [{ ...item.answers[0], value: event.target.value }],
              isError: false,
            };
          }
          return item;
        }),
      }));
    };

  return {
    ...state,
    updateState,
    user,
    completedSections,
    activeSection,
    setActiveItem,
    onSubmitSection,
    onSubmitLastSection,
    onChangeRange,
  };
};
