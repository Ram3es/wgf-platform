import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

import { QuizPage } from '../caas-quiz/quiz-page';
import { ResultPage } from '../caas-quiz/result-page';
import { DashboardPage } from '../dashboard-page';
import { MainPage } from '../main-page';
import { ResetPassword } from '../reset-password';
import { SignIn } from '../sign-in';
import { SignUp } from '../sign-up';
import { UpdateResetedPassword } from '../update-reseted-password';
import { PrivateRoute } from './private-route';

import { ROUTES } from '@constants/routes';

export const Router: React.FC = () => (
  <Switch>
    <Route exact path={ROUTES.main} component={MainPage} />
    <PrivateRoute exact path={ROUTES.quiz} component={QuizPage} />
    <PrivateRoute exact path={ROUTES.dashboard} component={DashboardPage} />
    <Route exact path={ROUTES.results} component={ResultPage} />
    <Route exact path={ROUTES.signIn} component={SignIn} />
    <Route exact path={ROUTES.signUp} component={SignUp} />
    <Route exact path={ROUTES.resetPassword} component={ResetPassword} />
    <Route
      exact
      path={ROUTES.updatePassword}
      component={UpdateResetedPassword}
    />
    <Redirect to={ROUTES.main} />
  </Switch>
);
