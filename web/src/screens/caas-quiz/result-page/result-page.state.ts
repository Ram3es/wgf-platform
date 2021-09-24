import { useCallback, useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';

import { useUpdateState } from '@services/hooks/useUpdateState';
import { getPdf, getResults } from '@services/quiz.service';
import { storageService } from '@services/storage/storage';

import { downloadMessage } from '@constants/pop-up-messages';
import { initialResultState } from './result-page.constants';

import { IResultState } from './result-page.typings';

export const useResultState = () => {
  const { state, updateState } =
    useUpdateState<IResultState>(initialResultState);
  const [loading, setLoading] = useState(false);

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

    const { data } = await getResults({
      quizId,
      userId,
    });

    if (data) {
      return updateState({ results: data });
    }

    return replace('/');
  }, []);

  useEffect(() => {
    getResult();
  }, [getResult]);

  const generatePdf = () => async () => {
    setLoading(true);

    const {
      data: { file, name },
    } = await getPdf({
      userId: state.user.id,
      quizId: state.quiz.id,
    });

    if (!file) {
      return;
    }

    const html = `
      <p>A pdf file report was sent to your email.</p>
    `;
    downloadMessage(`data:application/pdf;base64,${file}`, name, html).fire();

    setLoading(false);
  };

  return {
    ...state,
    loading,
    generatePdf,
  };
};
