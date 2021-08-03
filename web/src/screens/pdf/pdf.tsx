import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

import { COLORS } from '@styles/colors';
import { Container } from '@styles/components/container';
import { FlexCenter } from '@styles/components/flex-center';
import { TextBlockStyles } from '@styles/components/text-block';
import { Banner } from '../result-page/components/banner';
import { NextSteps } from '../result-page/components/next-steps';
import { ResultSummary } from '../result-page/components/result-summary';

import { images } from '@constants/images';

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

export const Pdf: React.FC = () => {
  const query = new URLSearchParams(useLocation().search);

  const [state, setState] = useState(initialState);

  useEffect(() => {
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
  }, []);

  console.log(state);

  return (
    <>
      <Container>
        <Banner />
      </Container>
      <Container>
        <TitleStyles.h3 paddingY="20px">{state.name}</TitleStyles.h3>
        <ResultSummary results={state.results} />
        <NextSteps results={state.results} />
        <TitleStyles.h2 paddingY="20px" color={COLORS.grey}>
          Glossary
        </TitleStyles.h2>
        <TextBlockStyles>
          [Select template and insert standard text]
        </TextBlockStyles>
        <TitleStyles.h2 paddingY="20px" color={COLORS.grey}>
          Further Resources
        </TitleStyles.h2>
        <TextBlockStyles>
          [Select template and insert standard text + images + links]
        </TextBlockStyles>
        <FlexCenter>
          <img src={images.companyLogo} alt="logo" />
        </FlexCenter>
      </Container>
    </>
  );
};
