import React, { useCallback, useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';

import { BannerImagePdf } from '@components/banner-image-pdf';
import { Header } from '@components/header';
import { Container } from '@styles/components/container';
import { FlexCenter } from '@styles/components/flex-center';
import { BannerResult } from '../result-page/components/banner-result';
import { NextSteps } from '../result-page/components/next-steps';
import { QuickSummary } from '../result-page/components/quick-summary';
import { Resources } from '../result-page/components/resources';
import { ResultSummary } from '../result-page/components/result-summary';

import { getResults } from '@services/quiz.service';

import { IMAGES } from '@constants/images';
import { STRINGS } from '@constants/strings';
import { initialState } from './pdf-page.constants';

import { TitleStyles } from '@styles/components/title-styles';

export const PdfPage: React.FC = () => {
  const [state, setState] = useState(initialState);

  const { replace } = useHistory();

  const query = new URLSearchParams(useLocation().search);

  useEffect(() => {
    if (
      !query.get('userId') &&
      !query.get('quizId') &&
      !query.get('quizTitle')
    ) {
      return replace('/');
    }

    getQueryParams();
  }, []);

  const getResult = useCallback(async () => {
    const { data } = await getResults({
      quizId: query.get('quizId')!,
      userId: query.get('userId')!,
    });

    setState((prev) => ({ ...prev, results: data }));
  }, []);

  useEffect(() => {
    getResult();
  }, [getResult]);

  const getQueryParams = () => {
    const userId = query.get('userId')!;
    const userName = query.get('userName')!;
    const quizId = query.get('quizId')!;
    const quizTitle = query.get('quizTitle')!;

    setState((prev) => ({
      ...prev,
      userId,
      quizId,
      quizTitle,
      userName,
    }));
  };

  return (
    <>
      <Header />
      <BannerImagePdf />
      <BannerResult isPdfBanner />
      <Container>
        <TitleStyles.h3>{`${STRINGS.resultPage.userTitle} ${state.userName}`}</TitleStyles.h3>
        <ResultSummary results={state.results} quiz={state.quizTitle} />
        <NextSteps results={state.results} />
        <QuickSummary results={state.results} quiz={state.quizTitle} />
        <Resources />
        <FlexCenter>
          <img src={IMAGES.companyLogo} alt={STRINGS.altLogo} />
        </FlexCenter>
      </Container>
    </>
  );
};
