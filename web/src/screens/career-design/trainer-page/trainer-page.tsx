import React, { FC } from 'react';

import { PROMISES_AREA } from '@constants/promises-area';
import { Icon } from '@components/icon';
import { Loader } from '@components/loader';
import { Backdrop } from '@components/backdrop';
import { BreadCrumb } from '@components/bread-crumb';

import { COLORS } from '@styles/colors';
import { TitleStyles } from '@styles/components/title-styles';
import { GameButton } from '@screens/main-page/components';
import { CommonStylesForPages as CommonStyled } from '@screens/platform-page/platform-page.styles';

import { GridInfo } from './grid-info';
import { ShevronIcons } from './shevron-icons';
import { useTrainerPageState } from './trainer-page.state';
import { TrainerPageStyles as Styled } from './trainer-page.styles';

interface TrainerPageProps {
  trainerId: string;
}

export const TrainerPage: FC<TrainerPageProps> = ({ trainerId }) => {
  const { fieldsValue, toggleShevron, isShowShevron } =
    useTrainerPageState(trainerId);
  return (
    <CommonStyled.Wrapper>
      <Backdrop />
      <Styled.Content>
        <BreadCrumb />
        <Styled.HeaderWrapper>
          <Styled.IconTextWrapper>
            <Icon type="careerDesignLogo" />
          </Styled.IconTextWrapper>
          <Styled.TextWithDivider>Career Design Game</Styled.TextWithDivider>
        </Styled.HeaderWrapper>
        <Styled.GameSetting>
          <Styled.Title>
            <Styled.LimitTitle>
              <Styled.IconWrapper>
                <Icon type="setting" />
              </Styled.IconWrapper>
              <TitleStyles.h2 color={COLORS.violet}>
                Game Account Setting
              </TitleStyles.h2>
            </Styled.LimitTitle>
            {fieldsValue ? (
              <ShevronIcons
                isShowShevron={isShowShevron}
                onClick={toggleShevron}
              />
            ) : (
              <>
                <Loader area={PROMISES_AREA.getLimitSetting}>
                  <Styled.Warning>No limits set</Styled.Warning>
                </Loader>
              </>
            )}
          </Styled.Title>
          {fieldsValue && isShowShevron && (
            <Styled.TbaleSettings>
              <GridInfo fieldsValue={fieldsValue} />
            </Styled.TbaleSettings>
          )}
        </Styled.GameSetting>
        <Styled.GameBtnContainer>
          <Styled.InfoTabletsWrap>
            <Styled.Tablet1>
              <div>No. of Games used:</div>
              <p>{fieldsValue?.gamesUsed}</p>
            </Styled.Tablet1>
            <Styled.Tablet2>
              <div>No. of Games Remaining:</div>
              <p>{fieldsValue?.remainingGames}</p>
            </Styled.Tablet2>
          </Styled.InfoTabletsWrap>

          <GameButton title="Go to Game Admin Panel" />
        </Styled.GameBtnContainer>
      </Styled.Content>
    </CommonStyled.Wrapper>
  );
};
