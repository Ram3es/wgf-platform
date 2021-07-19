import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

import { BannerImage } from '@components/banner-image';
import { Button } from '@components/button';
import { Header } from '@components/header';
import { COLORS } from '@styles/colors';
import { Container } from '@styles/components/container';
import { FlexCenter } from '@styles/components/flex-center';
import { TextBlockStyles } from '@styles/components/text-block';
import { Banner } from './components/banner-result';
import { NextSteps } from './components/next-steps';
import { ResultSummary } from './components/result-summary';

import { getPdf } from '@services/user.service';

import { BASE_URL } from '@constants/config';
import { images } from '@constants/images';
import { SESSION_STORAGE } from '@constants/storage';
import { STRINGS } from '@constants/strings';

import { TitleStyles } from '@styles/components/title-styles';

export const ResultPage: React.FC = () => {
  const user: IUser = JSON.parse(sessionStorage.getItem(SESSION_STORAGE.user)!);

  const [loading, setLoading] = useState(false);

  const { replace } = useHistory();

  const [results, setResult] = useState<IResults>();

  useEffect(() => {
    const result = JSON.parse(sessionStorage.getItem(SESSION_STORAGE.results)!);
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

    window.open(`${BASE_URL}/static/${file}`, '_blank');

    setLoading(false);
  };

  return (
    <>
      <Header />
      <BannerImage />
      <Container>
        <Banner />
        <TitleStyles.h3 paddingY="20px">
          {`${user.firstName}  ${user.lastName}`}
        </TitleStyles.h3>
        <ResultSummary results={results} />
        <NextSteps results={results} />
        {STRINGS.resultPage.resultTextBlocks.map(({ title, text }, i) => (
          <div key={i}>
            <TitleStyles.h2 paddingY="20px" color={COLORS.grey}>
              {title}
            </TitleStyles.h2>
            <TextBlockStyles>{text}</TextBlockStyles>
          </div>
        ))}
        <FlexCenter>
          <Button
            title={STRINGS.button.print}
            color={COLORS.black}
            onClick={generatePdf(user.id)}
            isDisabled={loading}
            image="next"
          />
        </FlexCenter>
        <FlexCenter>
          <img src={images.companyLogo} alt={STRINGS.altLogo} />
        </FlexCenter>
      </Container>
    </>
  );
};
