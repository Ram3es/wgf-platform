import axios from 'axios';
import { createRef, useCallback, useEffect, useRef, useState } from 'react';
import { trackPromise } from 'react-promise-tracker';
import { useHistory } from 'react-router-dom';

import { useAppSelector } from '@services/hooks/redux';
import { useUpdateState } from '@services/hooks/useUpdateState';
import { getCsv, getQuestions, postAnswers } from '@services/quiz.service';
import { storageService } from '@services/storage/storage';

import { downloadMessage, errorMessage, unAutorizedError } from '@constants/pop-up-messages';
import { PROMISES_AREA } from '@constants/promises-area';
import { ROUTES } from '@constants/routes';
import { initialState } from './quiz.constants';

export const useQuizState = () => {
  const { state, updateState } = useUpdateState(initialState);
  const [isFirst, setIsFirst] = useState(true);

  const { push, replace } = useHistory();

  const quiz = storageService.getQuiz();

  const { user } = useAppSelector((state) => state);

  const createQuestionList = useCallback(async () => {
    const listStorage = storageService.getQuestionList(quiz?.title || '');

    if (!quiz) {
      return replace('/');
    }

    if (listStorage.length < 1) {
      try {
        const { data } = await trackPromise(
          getQuestions({
            quizId: quiz?.id ?? '',
          }),
          PROMISES_AREA.getCaasQuestionList
        );

        const listWithAnswers: IQuestionListItem[] = data.questions.sort(
          (a, b) => a.order - b.order
        );

        const isLatestAnswers = listWithAnswers.every(
          (item) => item.answers.length > 0
        );

        storageService.setIsQuizLatestAnswers(isLatestAnswers, quiz.title);

        const listWithoutAnswers: IQuestionListItem[] = listWithAnswers.map(
          (item) => ({
            ...item,
            answers: [],
          })
        );

        const list = state.isShowLatestResult
          ? listWithAnswers
          : listWithoutAnswers;

        storageService.setQuestionList(list, quiz?.title || '');
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
    }

    updateState({
      questionList: storageService.getQuestionList(quiz?.title || ''),
      currentPage: storageService.getCurrentPage(quiz?.title || ''),
    });
  }, [state.isShowLatestResult]);

  useEffect(() => {
    createQuestionList();
  }, [createQuestionList]);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }, [state.currentPage]);

  const errorRef: React.MutableRefObject<React.RefObject<HTMLDivElement>[]> =
    useRef([...new Array(state.questionPerPage)].map(() => createRef()));

  const isLastPage =
    state.questionList[state.questionList.length - 1] ===
    state.questionListForPage[state.questionListForPage.length - 1];

  const getIndexForSlice = () => {
    const lastQuestionIndex = state.currentPage * state.questionPerPage;
    const firstQuestionIndex = lastQuestionIndex - state.questionPerPage;

    return {
      lastQuestionIndex,
      firstQuestionIndex,
    };
  };

  useEffect(() => {
    const { firstQuestionIndex, lastQuestionIndex } = getIndexForSlice();

    updateState({
      questionListForPage: state.questionList.slice(
        firstQuestionIndex,
        lastQuestionIndex
      ),
    });

    if (isFirst) {
      return setIsFirst(false);
    }

    storageService.setCurrentPage(state.currentPage, quiz?.title || '');

    storageService.setQuestionList(state.questionList, quiz?.title || '');
  }, [state.currentPage, state.questionList, state.isShowLatestResult]);

  const handleError = () => {
    const { firstQuestionIndex, lastQuestionIndex } = getIndexForSlice();

    const errorList = state.questionList.map((elem) => {
      if (!elem.answers[0]?.value) {
        return { ...elem, isError: true };
      }
      return elem;
    });

    const currentList = errorList.slice(firstQuestionIndex, lastQuestionIndex);

    updateState({
      questionListForPage: currentList,
      questionList: errorList,
    });

    const isError = currentList.some((elem) => elem.isError);

    if (!isError) {
      return false;
    }

    const errorElem = currentList.findIndex((elem) => elem.isError);

    window.scrollTo({
      top: errorRef.current[errorElem].current!.offsetTop - 50,
      behavior: 'smooth',
    });

    return true;
  };

  const onSubmit = async () => {
    if (handleError()) {
      return;
    }

    updateState({
      questionList: state.questionList.map((elem) => ({
        ...elem,
        isError: false,
      })),
    });

    if (isLastPage) {
      try {
        await trackPromise(
          postAnswers(getAnswersRequestBody()),
          PROMISES_AREA.sendCaasAnswers
        );

        if (user.isSubscriber) {
          push(ROUTES.results);
        } else {
          updateState({
            isShowModal: true,
          });
        }

        return;
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
    }

    incrementPage();
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

  const incrementPage = () =>
    updateState({
      currentPage: ++state.currentPage,
    });

  const decrementPage = () =>
    updateState({
      currentPage: --state.currentPage,
    });

  const downloadCsv = async () => {
    try {
      const { data } = await trackPromise(
        getCsv({
          quizId: storageService.getQuiz()?.id || '',
        }),
        PROMISES_AREA.getCaasCsv
      );

      downloadMessage(
        `data:application/csv;base64,${data.file}`,
        `${storageService.getQuiz()?.title || 'quiz'}.csv`
      ).fire();
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

  return {
    ...state,
    updateState,
    onSubmit,
    incrementPage,
    decrementPage,
    errorRef,
    isLastPage,
    downloadCsv,
    user,
    quiz,
  };
};
