import React from 'react';

import { Backdrop } from '@components/backdrop';

import { DashboardStyles as Styled } from './dashboard.styles';
import { BreadCrumb } from '@components/bread-crumb';

export const Dashboard: React.FC = () => (
  <Styled.Wrapper>
    <Backdrop />
    <Styled.Content>
      <BreadCrumb />
      <p>Coming soon.</p>
    </Styled.Content>
  </Styled.Wrapper>
);
