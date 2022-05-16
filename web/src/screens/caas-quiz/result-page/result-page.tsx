import React from 'react';
import { NavLink } from 'react-router-dom';

import { Button } from '@components/button';
import { Loader } from '@components/loader';
import { COLORS } from '@styles/colors';
import { Container } from '@styles/components/container';
import { FlexCenter } from '@styles/components/flex-center';
import { BannerImage } from '../components/banner-image';
import { HeaderQuiz } from '../components/header-quiz';
import { BannerResult } from './components/banner-result';
import { NextSteps } from './components/next-steps';
import { QuickSummary } from './components/quick-summary';
import { Resources } from './components/resources';
import { ResultSummary } from './components/result-summary';

import { useResultState } from './result-page.state';

import { IMAGES } from '@constants/images';
import { PROMISES_AREA } from '@constants/promises-area';
import { ROUTES } from '@constants/routes';
import { STRINGS } from '@constants/strings';

import { TitleStyles } from '@styles/components/title-styles';
import { Header } from '@components/header';
import { ResultPageStyles as Styled } from './result-page.styles';

export const ResultPage: React.FC = () => {
  const { user, results, quiz, generatePdf } = useResultState();

  return (
    <>
      <Styled.PrintItem />
      <Header />
      <HeaderQuiz />
      <BannerImage />
      <Container>
        <BannerResult withBackground />
        <TitleStyles.h3 mb={20}>
          {STRINGS.resultPage.userTitle} {user.firstName}
        </TitleStyles.h3>
        <Loader area={PROMISES_AREA.getCaasResult}>
          <ResultSummary
            results={results}
            withArchetypesIcon
            quiz={quiz.title}
          />
          <NextSteps results={results} />
          <QuickSummary results={results} quiz={quiz.title} />
          <Resources />
          <FlexCenter>
            <Loader area={PROMISES_AREA.printCaasPdf}>
              <Button
                title={STRINGS.button.print}
                color={COLORS.black}
                onClick={generatePdf}
                iconType="next"
                isIconRight
              />
            </Loader>
          </FlexCenter>
          <FlexCenter>
            <NavLink to={ROUTES.main}>
              <img src={IMAGES.companyLogo} alt={STRINGS.altLogo} />
            </NavLink>
          </FlexCenter>
        </Loader>
      </Container>
    </>
  );
};
