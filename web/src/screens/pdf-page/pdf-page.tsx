import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

import { COLORS } from '@styles/colors';
import { Container } from '@styles/components/container';
import { FlexCenter } from '@styles/components/flex-center';
import { TextBlockStyles } from '@styles/components/text-block';
import { Banner } from '../result-page/components/banner-result';
import { NextSteps } from '../result-page/components/next-steps';
import { ResultSummary } from '../result-page/components/result-summary';

import { images } from '@constants/images';
import { STRINGS } from '@constants/strings';

import { TitleStyles } from '@styles/components/title-styles';

interface IInitalState {
  name: string;
  results: IResults;
}

const initialState: IInitalState = {
  name: '',
  results: {
    concern: {
      level: 'Low',
      score: 0,
    },
    confidence: {
      level: 'Low',
      score: 0,
    },
    control: {
      level: 'Low',
      score: 0,
    },
    curiosity: {
      level: 'Low',
      score: 0,
    },
    cooperation: {
      level: 'Low',
      score: 0,
    },
  },
};

export const PdfPage: React.FC = () => {
  const [state, setState] = useState(initialState);
  const query = new URLSearchParams(useLocation().search);

  const getQueryParams = () => {
    const name = query.get('name') || '';
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
      name,
      results: {
        concern,
        confidence,
        control,
        curiosity,
        cooperation,
      },
    });
  };

  useEffect(() => {
    getQueryParams();
  }, []);

  return (
    <>
      <Container>
        <Banner />
        <TitleStyles.h3 paddingY="20px">{state.name}</TitleStyles.h3>
        <ResultSummary results={state.results} />
        <NextSteps results={state.results} />
        {STRINGS.resultPage.resultTextBlocks.map(({ title, text }, i) => (
          <div key={i}>
            <TitleStyles.h2 paddingY="20px" color={COLORS.grey}>
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
