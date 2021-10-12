import React from 'react';

import { Backdrop } from '@components/backdrop';

import { DashboardStyles as Styled } from './dashboard.styles';

export const Dashboard: React.FC = () => {
  return (
    <Styled.Wrapper>
      <Backdrop />
      <Styled.Content>
        <p>Coming soon.</p>
      </Styled.Content>
    </Styled.Wrapper>
  );
};
