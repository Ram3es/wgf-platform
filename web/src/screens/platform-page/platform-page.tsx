import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { Footer } from '@components/footer';
import { Header } from '@components/header';
import { ROUTES } from '@constants/routes';
import { useAppSelector } from '@services/hooks/redux';
import { CareerDesignGame } from '@screens/career-design';
import { CareerCanvasTrainerPage } from '@screens/career-canvas/trainer-page';
import { CareerFlexTrainerPage } from '@screens/caas-quiz/quiz-page/components/trainer-page';
import { Dashboard } from './components/dashboard';
import { Invitation } from './components/invitation';
import { ManageUsers } from './components/manage-users/manage-users';
import { NavigationBar } from './components/navigation-bar';
import { Profile } from './components/profile';
import { Trainer } from './components/trainer';
import { EditUser } from './components/edit-page';
import { DeletePage } from './components/edit-page/delete-page';
import { ManageGroup } from './components/manage-group';
import { ManageTrainers } from './components/manage-trainers/manage-trainers';
import { PlatformPageStyles as Styled } from './platform-page.styles';

export const PlatformPage: React.FC = () => {
  const { user } = useAppSelector((state) => state);

  return (
    <>
      <Header />
      <Styled.Wrapper>
        <NavigationBar user={user} />
        <Switch>
          <Route exact path={ROUTES.dashboard} component={Dashboard} />
          <Route exact path={ROUTES.profile} component={Profile} />
          <Route exact path={ROUTES.trainer} component={Trainer} />
          <Route path={ROUTES.invitation} component={Invitation} />
          <Route exact path={ROUTES.manageUser} component={ManageUsers} />
          <Route
            exact
            path={ROUTES.manageTrainers}
            component={ManageTrainers}
          />
          <Route
            exact
            path={[ROUTES.editUser, ROUTES.editTrainer]}
            component={EditUser}
          />
          <Route
            exact
            path={[ROUTES.deleteUserAccount, ROUTES.deleteTrainerAccount]}
            component={DeletePage}
          />

          <Route
            exact
            path={[ROUTES.careerFlexAdmin, ROUTES.careerFlexPlusAdmin]}
            component={CareerFlexTrainerPage}
          />
          <Route
            exact
            path={ROUTES.careerDesignGame}
            component={CareerDesignGame}
          />
          <Route
            exact
            path={ROUTES.careerCanvasAdmin}
            component={CareerCanvasTrainerPage}
          />

          <Route exact path={ROUTES.manageGroup} component={ManageGroup} />
          <Route path={ROUTES.platform} component={Dashboard} />
          <Redirect to={ROUTES.platform} />
        </Switch>
      </Styled.Wrapper>
      <Footer />
    </>
  );
};
