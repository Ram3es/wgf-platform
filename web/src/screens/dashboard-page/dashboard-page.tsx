import React, { useEffect, useMemo, useState } from 'react';
import { useHistory } from 'react-router-dom';

import { Header } from '@components/header';
import { Dashboard } from './components/dashboard';
import { NavigationBar } from './components/navigation-bar';
import { Profile } from './components/profile';

import { storageService } from '@services/storage/storage';

import { DashboardPageStyles as Styled } from './dashboard-page.styles';

export const DashboardPage: React.FC = () => {
  const { replace } = useHistory();
  const user = useMemo(() => storageService.getUser(), []);

  useEffect(() => {
    if (!user) {
      return replace('/');
    }
  }, []);

  const [activeDashboarItem, setActiveDashboarItem] = useState('Dashboard');
  const setActiveItem = (item: string) => () => {
    setActiveDashboarItem(item);
  };

  const NAVIGATION_HASH_MAPS: Record<string, React.ReactNode> = {
    Dashboard: <Dashboard />,
    Profile: <Profile />,
  };

  return (
    <>
      <Header />
      <Styled.Wrapper>
        <NavigationBar
          setActiveItem={setActiveItem}
          activeDashboardItem={activeDashboarItem}
          user={user!}
        />
        {NAVIGATION_HASH_MAPS[activeDashboarItem] || <Dashboard />}
      </Styled.Wrapper>
    </>
  );
};
