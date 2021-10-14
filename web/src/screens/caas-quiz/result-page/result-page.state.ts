import axios from 'axios';
import { useCallback, useEffect, useState } from 'react';
import { trackPromise } from 'react-promise-tracker';
import { useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';

import { RootState } from '@store/store';

import { useUpdateState } from '@services/hooks/useUpdateState';
import { getPdf, getResults } from '@services/quiz.service';
import { storageService } from '@services/storage/storage';

import { downloadMessage, errorMessage, unAutorizedError } from '@constants/pop-up-messages';
import { PROMISES_AREA } from '@constants/promises-area';
import { initialResultState } from './result-page.constants';

import { IPdf, IResultState } from './result-page.typings';

export const useResultState = () => {
  const { state, updateState } =
    useUpdateState<IResultState>(initialResultState);

  const { push } = useHistory();

  const [filePdf, setFilePdf] = useState<null | IPdf>(null);

  const userInfo = useSelector((state: RootState) => state.user);

  const { replace } = useHistory();

  const query = new URLSearchParams(useLocation().search);

  const getResult = useCallback(async () => {
    const quizTitle =
      storageService.getQuiz()?.title || query.get('quizTitle')!;
    const quizId = storageService.getQuiz()?.id || query.get('quizId')!;
    const userId = userInfo?.id || query.get('userId')!;
    const results = storageService.getResults(quizTitle);

    const user = {
      id: userId,
      firstName: userInfo?.firstName || query.get('userName')!,
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

  const getPdfFile = async () => {
    if (!filePdf) {
      try {
        const { data } = await trackPromise(
          getPdf({
            userId: state.user.id,
            quizId: state.quiz.id,
          }),
          PROMISES_AREA.printCaasPdf
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
        }
      }
    }

    return filePdf;
  };

  const generatePdf = async () => {
    const data = await getPdfFile();

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

  return {
    ...state,
    generatePdf,
  };
};
