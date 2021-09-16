import React, { useEffect, useState } from 'react';
import { NavLink, useHistory } from 'react-router-dom';

import { BannerImage } from '@components/banner-image';
import { Button } from '@components/button';
import { Header } from '@components/header';
import { COLORS } from '@styles/colors';
import { Container } from '@styles/components/container';
import { FlexCenter } from '@styles/components/flex-center';
import { BannerResult } from './components/banner-result';
import { NextSteps } from './components/next-steps';
import { QuickSummary } from './components/quick-summary';
import { Resources } from './components/resources';
import { ResultSummary } from './components/result-summary';

import { getPdf } from '@services/quiz.service';
import { storageService } from '@services/storage/storage';

import { IMAGES } from '@constants/images';
import { ROUTES } from '@constants/routes';
import { STRINGS } from '@constants/strings';

import { TitleStyles } from '@styles/components/title-styles';

export const ResultPage: React.FC = () => {
  const user: IUser | null = storageService.getUser();

  const [loading, setLoading] = useState(false);

  const { replace } = useHistory();

  const [results, setResult] = useState<IResults>();

  const [quiz, setQuiz] = useState<string>('');

  useEffect(() => {
    const quizTitle = storageService.getQuiz()?.title || '';
    const result: IResults | null = storageService.getResults(quizTitle);
    setQuiz(quizTitle);

    if (result) {
      return setResult(result);
    }

    return replace('/');
  }, []);

  if (!results) {
    return <div />;
  }

  const generatePdf = () => async () => {
    setLoading(true);

    const {
      data: { file, name },
    } = await getPdf({
      userId: user?.id || '',
      quizId: storageService.getQuiz()?.id || '',
    });

    if (!file) {
      return;
    }

    const downloadButton = document.createElement('a');
    downloadButton.href = `data:application/pdf;base64,${file}`;
    downloadButton.download = name;
    downloadButton.target = '_blank';

    downloadButton.click();
    downloadButton.remove();

    setLoading(false);
  };

  return (
    <>
      <Header />
      <BannerImage />
      <Container>
        <BannerResult withBackground />
        <TitleStyles.h3 mb={20}>
          {`${STRINGS.resultPage.userTitle} ${user?.firstName}`}
        </TitleStyles.h3>
        <ResultSummary results={results} withArchetypesIcon quiz={quiz} />
        <NextSteps results={results} />
        <QuickSummary results={results} quiz={quiz} />
        <Resources />
        <FlexCenter>
          <Button
            title={STRINGS.button.print}
            color={COLORS.black}
            onClick={generatePdf()}
            isDisabled={loading}
            image="next"
          />
        </FlexCenter>
        <FlexCenter>
          <NavLink to={ROUTES.main}>
            <img src={IMAGES.companyLogo} alt={STRINGS.altLogo} />
          </NavLink>
        </FlexCenter>
      </Container>
    </>
  );
};
