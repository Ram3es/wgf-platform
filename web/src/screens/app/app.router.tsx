import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

import { QuizPage } from '@screens/caas-quiz/quiz-page';
import { ResultPage } from '@screens/caas-quiz/result-page';
import { CanvasQuizPage } from '@screens/career-canvas/canvas-quiz-page';
import { CanvasResults } from '@screens/career-canvas/canvas-results';
import { ErrorPage } from '@screens/error-page';
import { MainPage } from '@screens/main-page';
import { PlatformPage } from '@screens/platform-page';
import { ResetPassword } from '@screens/reset-password';
import { SignIn } from '@screens/sign-in';
import { SignUp } from '@screens/sign-up';
import { UpdateResetedPassword } from '@screens/update-reseted-password';
import { PrivateRoute } from './private-route';

import { ROUTES } from '@constants/routes';

export const AppRouter: React.FC = () => (
  <Switch>
    <Route exact path={ROUTES.main} component={MainPage} />
    <Route exact path={ROUTES.careerFlexResults} component={ResultPage} />
    <PrivateRoute exact path={ROUTES.careerFlex} component={QuizPage} />
    <PrivateRoute path={ROUTES.platform} component={PlatformPage} />
    <Route exact path={ROUTES.signIn} component={SignIn} />
    <Route exact path={ROUTES.signUp} component={SignUp} />
    <Route exact path={ROUTES.errorPage} component={ErrorPage} />
    <Route exact path={ROUTES.resetPassword} component={ResetPassword} />
    <PrivateRoute
      exact
      path={ROUTES.careerDesignCanvas}
      component={CanvasQuizPage}
    />
    <Route
      exact
      path={ROUTES.careerDesignCanvasResults}
      component={CanvasResults}
    />

    <Route
      exact
      path={ROUTES.updatePassword}
      component={UpdateResetedPassword}
    />
    <Redirect to={ROUTES.main} />
  </Switch>
);
