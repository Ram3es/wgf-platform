import React, { useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';

import { COLORS } from '@styles/colors';
import { Container } from '@styles/components/container';
import { FlexCenter } from '@styles/components/flex-center';
import { TextBlockStyles } from '@styles/components/text-block';
import { NextSteps } from '../result-page/components/next-steps';
import { ResultSummary } from '../result-page/components/result-summary';
import { HeaderPdf } from './components/header-pdf';

import { images } from '@constants/images';
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
    const concern = {
      level: query.get('concern_level') || 'Low',
      score: +(query.get('concern_score') || 0),
    };
    const confidence = {
      level: query.get('confidence_level') || 'Low',
      score: +(query.get('confidence_score') || 0),
    };
    const control = {
      level: query.get('control_level') || 'Low',
      score: +(query.get('control_score') || 0),
    };
    const curiosity = {
      level: query.get('curiosity_level') || 'Low',
      score: +(query.get('curiosity_score') || 0),
    };
    const cooperation = {
      level: query.get('cooperation_level') || 'Low',
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
      <HeaderPdf />
      <Container>
        <TitleStyles.h3 paddingY="-10px">{`${state.firstName}  ${state.lastName}`}</TitleStyles.h3>
        <ResultSummary results={state.results} />
        <NextSteps results={state.results} />
        {STRINGS.resultPage.resultTextBlocks.map(({ title, text }, i) => (
          <div key={i}>
            <TitleStyles.h2 paddingY="5px" color={COLORS.grey}>
              {title}
            </TitleStyles.h2>
            <TextBlockStyles>{text}</TextBlockStyles>
          </div>
        ))}
        <FlexCenter>
          <img src={images.companyLogo} alt={STRINGS.altLogo} />
        </FlexCenter>
      </Container>
    </>
  );
};
