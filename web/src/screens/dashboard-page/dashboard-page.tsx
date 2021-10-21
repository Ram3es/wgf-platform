import React, { useState } from 'react';

import { Header } from '@components/header';
import { Dashboard } from './components/dashboard';
import { Invitation } from './components/invitation';
import { NavigationBar } from './components/navigation-bar';
import { Profile } from './components/profile';
import { Trainer } from './components/trainer';

import { useAppSelector } from '@services/hooks/redux';

import { DashboardPageStyles as Styled } from './dashboard-page.styles';

export const DashboardPage: React.FC = () => {
  const { user } = useAppSelector((state) => state);

  const [activeDashboarItem, setActiveDashboarItem] = useState('Dashboard');
  const setActiveItem = (item: string) => () => {
    setActiveDashboarItem(item);
  };

  const NAVIGATION_HASH_MAPS: Record<string, React.ReactNode> = {
    Dashboard: <Dashboard />,
    Profile: <Profile />,
    Trainer: <Trainer />,
    ['Invite Users/Trainers']: <Invitation />,
    ['Invite Users']: <Invitation />,
  };

  return (
    <>
      <Header />
      <Styled.Wrapper>
        <NavigationBar
          setActiveItem={setActiveItem}
          activeDashboardItem={activeDashboarItem}
          user={user}
        />
        {NAVIGATION_HASH_MAPS[activeDashboarItem] || <Dashboard />}
      </Styled.Wrapper>
    </>
  );
};
