import React from 'react';

import { COLORS } from '@styles/colors';
import { BulkInvite } from './components/bulk-invite';
import { IndividualInvite } from './components/individual-invite';

import { useAppSelector } from '@services/hooks/redux';

import { STRINGS } from '@constants/strings';

import { CommonStylesForPages as CommonStyled } from '@screens/platform-page/platform-page.styles';
import { TitleStyles } from '@styles/components/title-styles';

export const InviteUsers: React.FC = () => {
  const { user } = useAppSelector((state) => state);
  return (
    <CommonStyled.InnerWrapper>
      <TitleStyles.h2 color={COLORS.grey} textAlign="left" mb={15}>
        {STRINGS.invitation.inviteUsersTitle[user.role]}
      </TitleStyles.h2>
      <div>
        <IndividualInvite />
        <BulkInvite />
      </div>
    </CommonStyled.InnerWrapper>
  );
};
