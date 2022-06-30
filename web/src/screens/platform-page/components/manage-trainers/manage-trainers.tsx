import { Backdrop } from '@components/backdrop';
import { BreadCrumb } from '@components/bread-crumb';
import { CommonStylesForPages as CommonStyled } from '@screens/platform-page/platform-page.styles';
import { COLORS } from '@styles/colors';
import { TitleStyles } from '@styles/components/title-styles';
import { FC, useEffect } from 'react';
import { animateScroll } from 'react-scroll';
import { ManageTrainersTable } from './components/manage-trainer-table';
import { ManageTrainersStyles as Styled } from './manage-trainers.styles';

export const ManageTrainers: FC = () => {
  useEffect(() => {
    animateScroll.scrollToTop();
  }, []);
  return (
    <CommonStyled.Wrapper>
      <Backdrop />
      <CommonStyled.Content>
        <BreadCrumb />
        <CommonStyled.InnerWrapper>
          <Styled.HeaderSectionWrapper>
            <TitleStyles.h2 color={COLORS.grey} textAlign="left" mb={40}>
              Manage Trainers
            </TitleStyles.h2>
          </Styled.HeaderSectionWrapper>
          <ManageTrainersTable />
        </CommonStyled.InnerWrapper>
      </CommonStyled.Content>
    </CommonStyled.Wrapper>
  );
};
