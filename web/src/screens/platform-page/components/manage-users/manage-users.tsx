import { FC } from 'react';

import { Backdrop } from '@components/backdrop';
import { COLORS } from '@styles/colors';
import { ManageUsersTable } from './components/manage-user-table';



import { CommonStylesForPages as CommonStyled } from '@screens/platform-page/platform-page.styles';
import { TitleStyles } from '@styles/components/title-styles';
import { ManageUsersStyles as Styled } from './manage-users.styles';

export const ManageUsers: FC = () => {
  return (
    <CommonStyled.Wrapper>
      <Backdrop />
      <CommonStyled.Content>
        <CommonStyled.InnerWrapper>
          <Styled.HeaderSectionWrapper>
            <TitleStyles.h2 color={COLORS.grey} textAlign="left" mb={40}>
              Manage Users
            </TitleStyles.h2>
          </Styled.HeaderSectionWrapper>
          <ManageUsersTable />
        </CommonStyled.InnerWrapper>
      </CommonStyled.Content>
    </CommonStyled.Wrapper>
  );
};
