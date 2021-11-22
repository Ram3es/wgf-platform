import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

import { QuizPage } from '@screens/caas-quiz/quiz-page';
import { ResultPage } from '@screens/caas-quiz/result-page';
import { DashboardPage } from '@screens/dashboard-page';
import { MainPage } from '@screens/main-page';
import { ResetPassword } from '@screens/reset-password';
import { SignIn } from '@screens/sign-in';
import { SignUp } from '@screens/sign-up';
import { UpdateResetedPassword } from '@screens/update-reseted-password';
import { PrivateRoute } from './private-route';

import { ROUTES } from '@constants/routes';

export const AppRouter: React.FC = () => (
  <Switch>
    <Route exact path={ROUTES.main} component={MainPage} />
    <PrivateRoute exact path={ROUTES.quiz} component={QuizPage} />
    <PrivateRoute path={ROUTES.platform} component={DashboardPage} />
    <Route exact path={ROUTES.results} component={ResultPage} />
    <Route exact path={ROUTES.signIn} component={SignIn} />
    <Route exact path={ROUTES.signUp} component={SignUp} />
    <Route exact path={ROUTES.resetPassword} component={ResetPassword} />
    {/* <PrivateRoute
      exact
      path={ROUTES.careerDesignCanvas}
      component={CanvasQuizPage}
    /> */}
    <Route
      exact
      path={ROUTES.updatePassword}
      component={UpdateResetedPassword}
    />
    <Redirect to={ROUTES.main} />
  </Switch>
);
