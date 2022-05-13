import axios from 'axios';
import { useCallback, useEffect, useState } from 'react';
import { trackPromise } from 'react-promise-tracker';
import { useHistory, useLocation } from 'react-router-dom';

import { useAppSelector } from '@services/hooks/redux';
import { useUpdateState } from '@services/hooks/useUpdateState';
import { getPdf, getResults } from '@services/quiz.service';
import { storageService } from '@services/storage/storage';

import {
  downloadMessage,
  errorMessage,
  unAutorizedError,
} from '@constants/pop-up-messages';
import { PROMISES_AREA } from '@constants/promises-area';
import { initialResultState } from './result-page.constants';

import { IResultState } from './result-page.typings';

export const useResultState = () => {
  const { state, updateState } =
    useUpdateState<IResultState>(initialResultState);

  const { push } = useHistory();

  const [filePdf, setFilePdf] = useState<null | IPdf>(null);

  const userInfo = useAppSelector((state) => state.user);

  const { replace } = useHistory();

  const query = new URLSearchParams(useLocation().search);

  const getResult = useCallback(async () => {
    const quizTitle =
      storageService.getQuiz()?.title || query.get('quizTitle')!;
    const quizId = storageService.getQuiz()?.id || query.get('quizId')!;
    const userId = userInfo?.id || query.get('userId')!;

    if (!quizId || !quizTitle) {
      return replace('/');
    }

    const user = {
      id: userId,
      firstName: userInfo?.firstName || query.get('userName')!,
    };

    updateState({ quiz: { id: quizId, title: quizTitle }, user });
    try {
      const { data } = await trackPromise(
        getResults({
          quizId,
          userId,
        }),
        PROMISES_AREA.getCaasResult
      );

      return updateState({ results: data });
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return errorMessage(error?.response?.data.message).fire();
      }
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
      `data:application/octet-stream;base64,${data!.file}`,
      data!.name,
      html
    ).fire();
  };

  return {
    ...state,
    generatePdf,
  };
};
