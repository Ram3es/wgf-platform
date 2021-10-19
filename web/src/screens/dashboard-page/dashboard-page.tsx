import React, { useState } from 'react';
import { useSelector } from 'react-redux';

import { Header } from '@components/header';
import { RootState } from '@store/store';
import { Dashboard } from './components/dashboard';
import { NavigationBar } from './components/navigation-bar';
import { Profile } from './components/profile';
import { Trainer } from './components/trainer';

import { DashboardPageStyles as Styled } from './dashboard-page.styles';

export const DashboardPage: React.FC = () => {
  const { user } = useSelector((state: RootState) => state);

  const [activeDashboarItem, setActiveDashboarItem] = useState('Dashboard');
  const setActiveItem = (item: string) => () => {
    setActiveDashboarItem(item);
  };

  const NAVIGATION_HASH_MAPS: Record<string, React.ReactNode> = {
    Dashboard: <Dashboard />,
    Profile: <Profile />,
    Trainer: <Trainer />,
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
