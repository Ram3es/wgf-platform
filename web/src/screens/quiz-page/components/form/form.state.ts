import { ChangeEvent, createRef, useEffect, useRef } from 'react';

import { useUpdateState } from '@services/hooks/useUpdateState';
import { createUser } from '@services/user.service';

import { SESSION_STORAGE } from '@constants/storage';
import { initialState } from './form.constants';

export const useFormState = () => {
  const { state, updateState } = useUpdateState(initialState);

  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    const { firstQuestionIndex, lastQuestionIndex } = getIndexForSlice();

    updateState({
      questionListForPage: state.questionList.slice(
        firstQuestionIndex,
        lastQuestionIndex
      ),
    });
  }, [state.currentPage, state.questionList]);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });

    if (state.currentPage === 2) {
      updateState({
        user: {
          ...state.user,
          email: state.user.email.trim(),
          firstName: state.user.firstName.trim(),
          lastName: state.user.lastName.trim(),
        },
      });
    }
  }, [state.currentPage]);

  useEffect(() => {
    sessionStorage.setItem(
      SESSION_STORAGE.questionList,
      JSON.stringify(state.questionList)
    );
    sessionStorage.setItem(SESSION_STORAGE.user, JSON.stringify(state.user));
    sessionStorage.setItem(
      SESSION_STORAGE.currentPage,
      JSON.stringify(state.currentPage)
    );
  }, [state.questionList, state.user, state.currentPage]);

  const errorRef: React.MutableRefObject<React.RefObject<HTMLDivElement>[]> =
    useRef([...new Array(state.questionPerPage)].map(() => createRef()));

  const onChangeUser = (e: ChangeEvent<HTMLInputElement>) => {
    updateState((prev) => ({
      user: { ...prev.user, [e.target.name]: e.target.value },
    }));
  };

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

  const handleError = () => {
    const { firstQuestionIndex, lastQuestionIndex } = getIndexForSlice();

    const errorList = state.questionList.map((elem) => {
      if (!elem.answerValue) {
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
      const { data } = await createUser(getUserRequestBody());

      sessionStorage.setItem(
        SESSION_STORAGE.results,
        JSON.stringify(data.results)
      );

      sessionStorage.setItem(SESSION_STORAGE.userId, data.user.id);

      updateState({
        isShowModal: true,
      });

      return;
    }

    incrementPage();
  };

  const getUserRequestBody = () => ({
    ...state.user,
    answers: state.questionList.map((item) => ({
      questionNumber: item.questionNumber,
      answerValue: item.answerValue!,
    })),
  });

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
    onChangeUser,
    onSubmit,
    incrementPage,
    decrementPage,
    errorRef,
    isLastPage,
    formRef,
  };
};