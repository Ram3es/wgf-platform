import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { Header } from '@components/header';
import { CareerDesignGame } from '@screens/career-design';
import { Dashboard } from './components/dashboard';
import { Invitation } from './components/invitation';
import { ManageUsers } from './components/manage-users/manage-users';
import { NavigationBar } from './components/navigation-bar';
import { Profile } from './components/profile';
import { Trainer } from './components/trainer';
import { useAppSelector } from '@services/hooks/redux';
import { ROUTES } from '@constants/routes';
import { PlatformPageStyles as Styled } from './platform-page.styles';
import { ManageTrainers } from './components/manage-trainers/manage-trainers';
import { EditUser } from './components/edit-page';
import { DeletePage } from './components/edit-page/delete-page';
import { Footer } from '@components/footer';
import { ManageGroup } from './components/manage-group';

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
            path={ROUTES.careerDesignGame}
            component={CareerDesignGame}
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
