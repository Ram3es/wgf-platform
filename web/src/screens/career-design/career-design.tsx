import { FC } from 'react';

import { ROLES } from '@constants/user-roles';
import { Button } from '@components/button';

import { useAppSelector } from '@services/hooks/redux';
import { GameButton } from '@screens/main-page/components';

import { COLORS } from '@styles/colors';
import { ContainerPage } from '@styles/components/common-assesment-page';
import { COMMON_ASSESSMENT_PAGE as CommonStyled } from '@styles/components/common-assesment-page/common.styles';

import { TrainerPage } from './trainer-page';
import { PAGE_CONTENT } from './career-design.constants';
import { CareerDesignStyles as Styled } from './career-design.styles';

export const CareerDesignGame: FC = () => {
  const user = useAppSelector((state) => state.user);
  window.scroll({ top: 0, behavior: 'smooth' });

  const handleRedirect = () => {
    window.open(
      'https://witgritfit.com/career-design-life-simulation-digital',
      '_blank',
      'toolbar=0,location=0,menubar=0'
    );
  };
  return user.role === ROLES.trainerAdmin ? (
    <TrainerPage trainerId={user.id} />
  ) : (
    <ContainerPage>
      <CommonStyled.Title>{PAGE_CONTENT.title}</CommonStyled.Title>
      <CommonStyled.Text>{PAGE_CONTENT.text}</CommonStyled.Text>
      <Styled.BtnWrapper>
        <Button
          title={PAGE_CONTENT.btnFindMore}
          color={COLORS.blue}
          onClick={handleRedirect}
          minWidth={230}
        />
        <GameButton title={PAGE_CONTENT.btnTitleGame} />
      </Styled.BtnWrapper>
    </ContainerPage>
  );
};
