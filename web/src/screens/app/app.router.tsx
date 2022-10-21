import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

import { ROUTES } from '@constants/routes';

import { SignUpPage } from '@screens/sign-up-page';
import { SignInPage } from '@screens/sign-in-page';
import { MainPage } from '@screens/main-page';
import { ErrorPage } from '@screens/error-page';
import { PlatformPage } from '@screens/platform-page';
import { QuizPage } from '@screens/caas-quiz/quiz-page';
import { ResultPage } from '@screens/caas-quiz/result-page';
import { ResetPassword } from '@screens/reset-password';
import { CareerAdventure } from '@screens/career-adventure';
import { CanvasQuizPage } from '@screens/career-canvas/canvas-quiz-page';
import { CanvasResults } from '@screens/career-canvas/canvas-results';
import { RedirectToGame } from '@screens/career-design/link-redirect-game';
import { UpdateResetedPassword } from '@screens/update-reseted-password';
import { HomePageSlider } from '@screens/home-page';

import { PrivateRoute } from './private-route';

export const AppRouter: React.FC = () => (
  <Switch>
    <PrivateRoute exact path={ROUTES.main} component={MainPage} />
    <Route exact path={ROUTES.welcome} component={HomePageSlider} />
    <PrivateRoute exact path={ROUTES.careerDesign} component={RedirectToGame} />
    <Route exact path={ROUTES.careerFlexResults} component={ResultPage} />
    <PrivateRoute exact path={ROUTES.careerFlex} component={QuizPage} />
    <PrivateRoute path={ROUTES.platform} component={PlatformPage} />
    <Route exact path={ROUTES.signUp} component={SignUpPage} />
    <Route exact path={ROUTES.signIn} component={SignInPage} />
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
    <Route exact path={ROUTES.myCareerAdventure} component={CareerAdventure} />
    <Redirect to={ROUTES.main} />
  </Switch>
);
