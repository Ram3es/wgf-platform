import React from 'react';

import { Backdrop } from '@components/backdrop';
import { InviteUsers } from './components/invite-users';

import { InvitationStyles as Styled } from './invitation.styles';

export const Invitation: React.FC = () => (
  <Styled.Wrapper>
    <Backdrop />
    <Styled.Content>
      <InviteUsers />
    </Styled.Content>
  </Styled.Wrapper>
);
