import React from 'react';
import { Route, Switch } from 'react-router-dom';

import { MainPage } from '../main-page';
import { PdfPage } from '../pdf-page';
import { ResultPage } from '../result-page';

import { ROUTES } from '@constants/routes';

export const Router: React.FC = () => (
  <Switch>
    <Route exact path={ROUTES.main}>
      <MainPage />
    </Route>
    <Route exact path={ROUTES.results}>
      <ResultPage />
    </Route>
    <Route exact path={ROUTES.pdf}>
      <PdfPage />
    </Route>
  </Switch>
);
