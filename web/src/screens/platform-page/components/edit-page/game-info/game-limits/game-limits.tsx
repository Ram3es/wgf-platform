import { FC } from 'react';
import { Icon } from '@components/icon';
import { Loader } from '@components/loader';
import { PROMISES_AREA } from '@constants/promises-area';
import { COLORS } from '@styles/colors';
import { TitleStyles } from '@styles/components/title-styles';
import { GameInfoStyles as Styled } from '../game-info.styles';
import { GameLimitsForm } from '../game-limits-form';
import { useGameLimitsState } from './game-limits.state';

export const GameLimits: FC = () => {
  const {
    limitData,
    changeLimit,
    isEditMode,
    toggleEditMode,
    setLimitSetting,
    unlimitedHandler,

    toggleCalendar,
    isShowCalendar,
    calendarHandler,
    calendarRef,
    returnPrevSettings,
  } = useGameLimitsState();

  return (
    <>
      <Styled.GameInfoWrapper>
        <Styled.Header>
          <Styled.IconWrapper>
            <Icon type="setting" />
          </Styled.IconWrapper>
          <Styled.TitleWrapper>
            <TitleStyles.h2 color={COLORS.violet}> Game Limits </TitleStyles.h2>
            {isEditMode ? (
              <Styled.IconShadowDark>
                <Icon type="editFormActive" onClick={() => toggleEditMode()} />
              </Styled.IconShadowDark>
            ) : (
              <Styled.IconShadow>
                <Icon type="editFormInert" onClick={() => toggleEditMode()} />
              </Styled.IconShadow>
            )}
          </Styled.TitleWrapper>
        </Styled.Header>
        <Loader area={PROMISES_AREA.getLimitSetting} />
        <GameLimitsForm
          limitData={limitData}
          limitChange={changeLimit}
          isEditMode={isEditMode}
          editMode={toggleEditMode}
          setLimitSetting={setLimitSetting}
          unlimitedHandler={unlimitedHandler}
          toggleCalendar={toggleCalendar}
          isShowCalendar={isShowCalendar}
          calendarHandler={calendarHandler}
          calendarRef={calendarRef}
          returnPrevSettings={returnPrevSettings}
        />
      </Styled.GameInfoWrapper>
    </>
  );
};
