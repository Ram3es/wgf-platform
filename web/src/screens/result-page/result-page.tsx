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

import { getPdf } from '@services/user.service';

import { BASE_URL } from '@constants/config';
import { IMAGES } from '@constants/images';
import { ROUTES } from '@constants/routes';
import { SESSION_STORAGE } from '@constants/storage';
import { STRINGS } from '@constants/strings';

import { TitleStyles } from '@styles/components/title-styles';

export const ResultPage: React.FC = () => {
  const user: IUser = JSON.parse(sessionStorage.getItem(SESSION_STORAGE.user)!);

  const userId = sessionStorage.getItem(SESSION_STORAGE.userId)!;

  const [loading, setLoading] = useState(false);

  const { replace } = useHistory();

  const [results, setResult] = useState<IResults>();

  useEffect(() => {
    const result: IResults = JSON.parse(
      sessionStorage.getItem(SESSION_STORAGE.results)!
    );

    if (result) {
      return setResult(result);
    }

    return replace('/');
  }, []);

  if (!results) {
    return <div />;
  }

  const generatePdf = (id: string) => async () => {
    setLoading(true);

    const {
      data: { file },
    } = await getPdf(id);

    if (!file) {
      return;
    }

    window.open(`${BASE_URL}/static/${file}`, '_self');

    setLoading(false);
  };

  return (
    <>
      <Header />
      <BannerImage />
      <Container>
        <BannerResult withBackground />
        <TitleStyles.h3 paddingY="20px">
          {`${STRINGS.resultPage.userTitle} ${user.firstName}`}
        </TitleStyles.h3>
        <ResultSummary results={results} withArchetypesIcon />
        <NextSteps results={results} />
        <QuickSummary results={results} />
        <Resources />
        <FlexCenter>
          <Button
            title={STRINGS.button.print}
            color={COLORS.black}
            onClick={generatePdf(userId)}
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
