import { Button } from '@components/button';
import { Icon } from '@components/icon';
import { Loader } from '@components/loader';
import { PROMISES_AREA } from '@constants/promises-area';
import { COLORS } from '@styles/colors';
import { TitleStyles } from '@styles/components/title-styles';
import { FC } from 'react';
import { GameInfoStyles as Styled } from '../game-info.styles';
import { GameLimitsForm } from '../game-limits-form';
import { useGameLimitsState } from './game-limits.state';
import { GameLimitsStyles } from './game-limits.styles';

export const GameLimits: FC = () => {
  const {
    limitData,
    changeLimit,
    isEditMode,
    toggleEditMode,
    setLimitSetting,
    showDrop,
    toggleDrop,
    unlimitedHandler,
    isShowForm,
    handleShowForm,
    toggleCalendar,
    isShowCalendar,
    calendarHandler,
    calendarRef,
  } = useGameLimitsState();

  return isShowForm ? (
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
                <Icon type="editFormActive" onClick={toggleEditMode} />
              </Styled.IconShadowDark>
            ) : (
              <Styled.IconShadow>
                <Icon type="editFormInert" onClick={toggleEditMode} />
              </Styled.IconShadow>
            )}
          </Styled.TitleWrapper>
        </Styled.Header>

        <GameLimitsStyles.FormWrapper>
          <GameLimitsForm
            limitData={limitData}
            limitChange={changeLimit}
            isEditMode={isEditMode}
            editMode={toggleEditMode}
            setLimitSetting={setLimitSetting}
            isShowSelect={showDrop}
            toggleDrop={toggleDrop}
            unlimitedHandler={unlimitedHandler}
            toggleCalendar={toggleCalendar}
            isShowCalendar={isShowCalendar}
            calendarHandler={calendarHandler}
            calendarRef={calendarRef}
          />
        </GameLimitsStyles.FormWrapper>
      </Styled.GameInfoWrapper>
    </>
  ) : (
    <Loader area={PROMISES_AREA.getLimitSetting}>
      <Button
        type="button"
        title="Create Trainer Limits"
        color={COLORS.violet}
        onClick={handleShowForm}
      />
    </Loader>
  );
};
