import React, { useEffect } from 'react';
import { useHistory } from 'react-router';

import { Backdrop } from '@components/backdrop';
import { TrainerRequest } from './components/trainer-request';
import { TrainerViewing } from './components/trainer-viewing';

import { useAppSelector } from '@services/hooks/redux';

import { ROUTES } from '@constants/routes';
import { ROLES } from '@constants/user-roles';

import { TrainerStyles as Styled } from './trainer.styles';

export const Trainer: React.FC = () => {
  const { user } = useAppSelector((state) => state);

  const { replace } = useHistory();

  useEffect(() => {
    if (user.role !== ROLES.user) {
      replace(ROUTES.dashboard);
    }
  }, [user]);

  return (
    <Styled.Wrapper>
      <Backdrop />
      <Styled.Content>
        <TrainerViewing />
        <TrainerRequest />
      </Styled.Content>
    </Styled.Wrapper>
  );
};
