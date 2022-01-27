import React, { useEffect } from 'react';
import { useHistory } from 'react-router';

import { Backdrop } from '@components/backdrop';
import { InviteUsers } from './components/invite-users';

import { useAppSelector } from '@services/hooks/redux';

import { ROUTES } from '@constants/routes';
import { ROLES } from '@constants/user-roles';

import { CommonStylesForPages as CommonStyled } from '../../platform-page.styles';

export const Invitation: React.FC = () => {
  const { user } = useAppSelector((state) => state);

  const { replace } = useHistory();

  useEffect(() => {
    if (user.role === ROLES.user) {
      replace(ROUTES.dashboard);
    }
  }, [user]);

  return (
    <CommonStyled.Wrapper>
      <Backdrop />
      <CommonStyled.Content>
        <InviteUsers />
      </CommonStyled.Content>
    </CommonStyled.Wrapper>
  );
};
