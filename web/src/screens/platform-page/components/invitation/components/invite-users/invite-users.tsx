import React from 'react';

import { COLORS } from '@styles/colors';
import { BulkInvite } from './components/bulk-invite';
import { IndividualInvite } from './components/individual-invite';

import { useAppSelector } from '@services/hooks/redux';

import { STRINGS } from '@constants/strings';

import { TitleStyles } from '@styles/components/title-styles';
import { InviteUsersStyled as Styled } from './invite-users.styles';

export const InviteUsers: React.FC = () => {
  const { user } = useAppSelector((state) => state);
  return (
    <Styled.Wrapper>
      <TitleStyles.h2 color={COLORS.grey} textAlign="left">
        {STRINGS.invitation.inviteUsersTitle[user.role]}
      </TitleStyles.h2>
      <div>
        <IndividualInvite />
        <BulkInvite />
      </div>
    </Styled.Wrapper>
  );
};
