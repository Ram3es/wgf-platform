import React, { useEffect } from 'react';
import { useHistory } from 'react-router';

import { ROUTES } from '@constants/routes';
import { ROLES } from '@constants/user-roles';

import { Backdrop } from '@components/backdrop';
import { BreadCrumb } from '@components/bread-crumb';
import { InviteUsers } from './components/invite-users';

import { scrollToTop } from '@services/utils/scroll';
import { useAppSelector } from '@services/hooks/redux';

import { CommonStylesForPages as CommonStyled } from '../../platform-page.styles';

export const Invitation: React.FC = () => {
  const { user } = useAppSelector((state) => state);

  const { replace } = useHistory();

  scrollToTop();

  useEffect(() => {
    if (user.role === ROLES.user) {
      replace(ROUTES.dashboard);
    }
  }, [user]);

  return (
    <CommonStyled.Wrapper>
      <Backdrop />
      <CommonStyled.Content>
        <BreadCrumb />
        <InviteUsers />
      </CommonStyled.Content>
    </CommonStyled.Wrapper>
  );
};
