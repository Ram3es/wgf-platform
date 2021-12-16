import React, { useEffect } from 'react';
import { useHistory } from 'react-router';

import { Backdrop } from '@components/backdrop';
import { InviteUsers } from './components/invite-users';

import { useAppSelector } from '@services/hooks/redux';

import { ROUTES } from '@constants/routes';
import { ROLES } from '@constants/user-roles';

import { InvitationStyles as Styled } from './invitation.styles';

export const Invitation: React.FC = () => {
  const { user } = useAppSelector((state) => state);

  const { replace } = useHistory();

  useEffect(() => {
    if (user.role === ROLES.user) {
      replace(ROUTES.dashboard);
    }
  }, [user]);

  return (
    <Styled.Wrapper>
      <Backdrop />
      <Styled.Content>
        <InviteUsers />
      </Styled.Content>
    </Styled.Wrapper>
  );
};
