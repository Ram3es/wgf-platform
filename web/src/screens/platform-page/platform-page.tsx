import React from 'react';
import { Route, Switch } from 'react-router-dom';

import { Header } from '@components/header';
import { Dashboard } from './components/dashboard';
import { Invitation } from './components/invitation';
import { NavigationBar } from './components/navigation-bar';
import { Profile } from './components/profile';
import { Trainer } from './components/trainer';

import { useAppSelector } from '@services/hooks/redux';

import { ROUTES } from '@constants/routes';

import { PlatformPageStyles as Styled } from './platform-page.styles';

export const PlatformPage: React.FC = () => {
  const { user } = useAppSelector((state) => state);

  return (
    <>
      <Header />
      <Styled.Wrapper>
        <NavigationBar user={user} />
        <Switch>
          <Route path={ROUTES.dashboard} component={Dashboard} />
          <Route path={ROUTES.profile} component={Profile} />
          <Route path={ROUTES.trainer} component={Trainer} />
          <Route path={ROUTES.invitation} component={Invitation} />
          <Route path={ROUTES.platform} component={Dashboard} />
        </Switch>
      </Styled.Wrapper>
    </>
  );
};
