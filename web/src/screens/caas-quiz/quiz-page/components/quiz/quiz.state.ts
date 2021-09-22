import { createRef, useCallback, useEffect, useRef, useState } from 'react';

import { useUpdateState } from '@services/hooks/useUpdateState';
import { getQuestions, postAnswers } from '@services/quiz.service';
import { storageService } from '@services/storage/storage';

import { initialState } from './quiz.constants';

export const useQuizState = () => {
  const { state, updateState } = useUpdateState(initialState);
  const [isFirst, setIsFirst] = useState(true);

  const quiz = storageService.getQuiz();

  const createQuestionList = useCallback(async () => {
    const { data } = await getQuestions({
      quizId: quiz?.id ?? '',
    });

    const list = data.questions.sort((a, b) => a.order - b.order);

    const listStorage = storageService.getQuestionList(quiz?.title || '');

    if (listStorage.length < 1) {
      storageService.setQuestionList(list, quiz?.title || '');
    }

    updateState({
      questionList: storageService.getQuestionList(quiz?.title || ''),
      currentPage: storageService.getCurrentPage(quiz?.title || ''),
      user: storageService.getUser(),
    });
  }, []);

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
  }, [state.currentPage, state.questionList]);

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
      await postAnswers(getAnswersRequestBody());

      updateState({
        isShowModal: true,
      });

      return;
    }

    incrementPage();
  };

  const getAnswersRequestBody = () =>
    state.questionList.map((item) => ({
      questionId: item.id,
      id: item.answers[0].id,
      value: item.answers[0].value,
      quizId: storageService.getQuiz()?.id || '',
    }));

  const incrementPage = () =>
    updateState({
      currentPage: ++state.currentPage,
    });

  const decrementPage = () =>
    updateState({
      currentPage: --state.currentPage,
    });

  return {
    ...state,
    updateState,
    onSubmit,
    incrementPage,
    decrementPage,
    errorRef,
    isLastPage,
  };
};
