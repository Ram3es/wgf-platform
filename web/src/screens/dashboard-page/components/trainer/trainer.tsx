import React from 'react';

import { Backdrop } from '@components/backdrop';
import { TrainerRequest } from './components/trainer-request';
import { TrainerViewing } from './components/trainer-viewing';

import { TrainerStyles as Styled } from './trainer.styles';

export const Trainer: React.FC = () => (
  <Styled.Wrapper>
    <Backdrop />
    <Styled.Content>
      <TrainerViewing />
      <TrainerRequest />
    </Styled.Content>
  </Styled.Wrapper>
);
