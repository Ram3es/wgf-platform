import axios from 'axios';
import { useCallback, useEffect } from 'react';
import { trackPromise } from 'react-promise-tracker';
import { useHistory, useLocation } from 'react-router-dom';

import { useUpdateState } from '@services/hooks/useUpdateState';
import { getPdf, getResults } from '@services/quiz.service';
import { storageService } from '@services/storage/storage';

import { downloadMessage, errorMessage } from '@constants/pop-up-messages';
import { PROMISES_AREA } from '@constants/promises-area';
import { initialResultState } from './result-page.constants';

import { IResultState } from './result-page.typings';

export const useResultState = () => {
  const { state, updateState } =
    useUpdateState<IResultState>(initialResultState);

  const { replace } = useHistory();

  const query = new URLSearchParams(useLocation().search);

  const getResult = useCallback(async () => {
    const quizTitle =
      storageService.getQuiz()?.title || query.get('quizTitle')!;
    const quizId = storageService.getQuiz()?.id || query.get('quizId')!;
    const userId = storageService.getUser()?.id || query.get('userId')!;
    const results = storageService.getResults(quizTitle);
    const user = {
      id: userId,
      firstName: storageService.getUser()?.firstName || query.get('userName')!,
    };

    updateState({ quiz: { id: quizId, title: quizTitle }, user });

    if (results) {
      return updateState({ results });
    }

    const { data } = await trackPromise(
      getResults({
        quizId,
        userId,
      }),
      PROMISES_AREA.getCaasResult
    );

    if (data) {
      const quizTitle =
        storageService.getQuiz()?.title || query.get('quizTitle')!;
      storageService.setResults(data, quizTitle);
      return updateState({ results: data });
    }

    return replace('/');
  }, []);

  useEffect(() => {
    getResult();
  }, [getResult]);

  const generatePdf = async () => {
    try {
      const {
        data: { file, name },
      } = await trackPromise(
        getPdf({
          userId: state.user.id,
          quizId: state.quiz.id,
        }),
        PROMISES_AREA.printCaasPdf
      );

      if (!file) {
        return;
      }

      const html = `
        <p>A pdf file report was sent to your email.</p>
      `;
      downloadMessage(`data:application/pdf;base64,${file}`, name, html).fire();
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return errorMessage(error?.response?.data.message).fire();
      }
    }
  };

  return {
    ...state,
    generatePdf,
  };
};
