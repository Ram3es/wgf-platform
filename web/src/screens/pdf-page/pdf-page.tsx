import React, { useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';

import { BannerImagePdf } from '@components/banner-image-pdf';
import { Header } from '@components/header';
import { Container } from '@styles/components/container';
import { FlexCenter } from '@styles/components/flex-center';
import { BannerResult } from '../result-page/components/banner-result';
import { Glance } from '../result-page/components/glance';
import { NextSteps } from '../result-page/components/next-steps';
import { Resources } from '../result-page/components/resources';
import { ResultSummary } from '../result-page/components/result-summary';

import { IMAGES } from '@constants/images';
import { STRINGS } from '@constants/strings';
import { initialState } from './pdf-page.constants';

import { TitleStyles } from '@styles/components/title-styles';

export const PdfPage: React.FC = () => {
  const [state, setState] = useState(initialState);

  const { replace } = useHistory();

  const query = new URLSearchParams(useLocation().search);

  useEffect(() => {
    if (!query.get('firstName')) {
      return replace('/');
    }

    getQueryParams();
  }, []);

  const getQueryParams = () => {
    const firstName = query.get('firstName') || '';
    const lastName = query.get('lastName') || '';
    const concern: ICategory = {
      level: (query.get('concern_level') as TLevels) || 'Low',
      score: +(query.get('concern_score') || 0),
    };
    const confidence: ICategory = {
      level: (query.get('confidence_level') as TLevels) || 'Low',
      score: +(query.get('confidence_score') || 0),
    };
    const control: ICategory = {
      level: (query.get('control_level') as TLevels) || 'Low',
      score: +(query.get('control_score') || 0),
    };
    const curiosity: ICategory = {
      level: (query.get('curiosity_level') as TLevels) || 'Low',
      score: +(query.get('curiosity_score') || 0),
    };
    const cooperation: ICategory = {
      level: (query.get('cooperation_level') as TLevels) || 'Low',
      score: +(query.get('cooperation_score') || 0),
    };

    setState({
      firstName,
      lastName,
      results: {
        concern,
        confidence,
        control,
        curiosity,
        cooperation,
      },
    });
  };

  return (
    <>
      <Header />
      <BannerImagePdf />
      <BannerResult isPdfBanner />
      <Container>
        <TitleStyles.h3 paddingY="0">{`${STRINGS.resultPage.userTitle} ${state.firstName}`}</TitleStyles.h3>
        <ResultSummary results={state.results} />
        <NextSteps results={state.results} />
        <Glance results={state.results} />
        <Resources />
        <FlexCenter>
          <img src={IMAGES.companyLogo} alt={STRINGS.altLogo} />
        </FlexCenter>
      </Container>
    </>
  );
};
