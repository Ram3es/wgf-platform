import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

import { MainPage } from '../main-page';
import { PdfPage } from '../pdf-page';
import { QuizPage } from '../quiz-page';
import { ResultPage } from '../result-page';

import { ROUTES } from '@constants/routes';

export const Router: React.FC = () => (
  <Switch>
    <Route exact path={ROUTES.main}>
      <MainPage />
    </Route>
    <Route exact path={ROUTES.quiz}>
      <QuizPage />
    </Route>
    <Route exact path={ROUTES.results}>
      <ResultPage />
    </Route>
    <Route exact path={ROUTES.pdf}>
      <PdfPage />
    </Route>
    <Redirect to={ROUTES.main} />
  </Switch>
);
