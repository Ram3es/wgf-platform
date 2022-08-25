import React, { FC, useEffect } from 'react';
import { Formik } from 'formik';
import { limitLabels, LimitsFormSchema } from './game-limits-form.constants';
import { FormStyles as Styled } from './game-limits-form.styles';
import {
  IGameLimitsFormProps,
  IInitialLimitsState,
} from './game-limits-form.typing';
import { TextField } from '@components/text-field';
import { Button } from '@components/button';
import { COLORS } from '@styles/colors';
import { CalendarForm } from './calendar';
import { IInit, useInputModal } from './input-modal/input-modal';
import { InputModal } from './input-modal';

export const GameLimitsForm: FC<IGameLimitsFormProps> = ({
  limitData,
  limitChange,
  isEditMode,
  editMode,
  setLimitSetting,
  unlimitedHandler,
  toggleCalendar,
  isShowCalendar,
  calendarHandler,
  calendarRef,
  returnPrevSettings,
}) => {
  const {
    refModal,
    toggleModal,
    isShowModal,
    hideInputModal,
    toggleCheckbox,
    isChecked,
    setCheckedCheckbox,
    setNotCheckedCheckbox,
  } = useInputModal();

  const { gameDuration, numberOfGames, playersPerGame } = isShowModal;

  let field: keyof IInitialLimitsState;
  useEffect(() => {
    for (field in limitData) {
      if (limitData[field] === 'unlimited') {
        setCheckedCheckbox(field as keyof IInit);
      } else {
        setNotCheckedCheckbox(field as keyof IInit);
      }
    }
  }, [limitData]);

  const handleClickTextField = (e: React.MouseEvent, name: keyof IInit) => {
    e.stopPropagation();
    isEditMode && toggleModal(name);
  };

  const handleSubmit = (values: IInitialLimitsState) => {
    editMode();
    setLimitSetting(values);
  };

  const handleCheckBoxChange = (e: React.MouseEvent, name: keyof IInit) => {
    e.stopPropagation();
    if (!isChecked[name]) {
      unlimitedHandler(name);
      toggleCheckbox(name);
      hideInputModal(name);
    } else {
      returnPrevSettings(name);
      toggleCheckbox(name);
      hideInputModal(name);
    }
  };

  return (
    <>
      <Formik
        initialValues={limitData}
        validationSchema={LimitsFormSchema}
        validateOnChange
        onSubmit={handleSubmit}
        enableReinitialize
      >
        {({ handleChange, handleSubmit, errors }) => {
          const handleUserChange = (
            event: React.ChangeEvent<HTMLInputElement>
          ) => {
            const { name } = event.target;
            handleChange(event);
            limitChange(event);
            hideInputModal(name as keyof IInit);
          };

          return (
            <>
              <Styled.Container>
                <Styled.FormWrapper>
                  <Styled.InputStyled
                    onClick={(e: React.MouseEvent) => {
                      handleClickTextField(e, 'numberOfGames');
                    }}
                  >
                    <TextField
                      value={limitData.numberOfGames || ''}
                      type="text"
                      name="numberOfGames"
                      onChange={handleUserChange}
                      height="38px"
                      label={limitLabels.numberOfGames}
                      labelFontSize="14px"
                      isLabelTop
                      colorGrey
                      withBorder={isEditMode}
                      isReadOnly={!isEditMode}
                      isEditMode={isEditMode}
                      error={errors['numberOfGames']}
                      isAutoCompleteOff
                      inputFullWidth
                    />
                    {!errors['numberOfGames'] && numberOfGames && (
                      <InputModal
                        references={refModal}
                        onChange={(e) => {
                          handleCheckBoxChange(e, 'numberOfGames');
                        }}
                        isChecked={isChecked.numberOfGames}
                      />
                    )}
                  </Styled.InputStyled>
                  <Styled.InputStyled
                    onClick={(e: React.MouseEvent) => {
                      handleClickTextField(e, 'playersPerGame');
                    }}
                  >
                    <TextField
                      value={limitData.playersPerGame || ''}
                      type="text"
                      name="playersPerGame"
                      onChange={handleUserChange}
                      height="38px"
                      label={limitLabels.playersPerGame}
                      isLabelTop
                      isEditMode={isEditMode}
                      labelFontSize="14px"
                      isReadOnly={!isEditMode}
                      colorGrey
                      withBorder={isEditMode}
                      error={errors['playersPerGame']}
                      isAutoCompleteOff
                      inputFullWidth
                    />
                    {!errors['playersPerGame'] && playersPerGame && (
                      <InputModal
                        references={refModal}
                        onChange={(e) => {
                          handleCheckBoxChange(e, 'playersPerGame');
                        }}
                        isChecked={isChecked.playersPerGame}
                      />
                    )}
                  </Styled.InputStyled>

                  <Styled.TextLabel>{`No. of Game(s) Used: ${limitData.gamesUsed}`}</Styled.TextLabel>
                  <Styled.InputStyled
                    onClick={(e: React.MouseEvent) => {
                      handleClickTextField(e, 'gameDuration');
                    }}
                  >
                    <TextField
                      value={limitData.gameDuration || ''}
                      type="text"
                      name="gameDuration"
                      placeholder="Example: 1d 4h 20m"
                      onChange={handleUserChange}
                      height="38px"
                      label={limitLabels.gameDuration}
                      isLabelTop={true}
                      labelFontSize="14px"
                      isReadOnly={!isEditMode}
                      isEditMode={isEditMode}
                      withBorder={isEditMode}
                      colorGrey
                      error={errors['gameDuration']}
                      isAutoCompleteOff
                      inputFullWidth
                    />
                    {gameDuration && !errors['gameDuration'] && (
                      <InputModal
                        references={refModal}
                        onChange={(e) => {
                          handleCheckBoxChange(e, 'gameDuration');
                        }}
                        isChecked={isChecked.gameDuration}
                      />
                    )}
                  </Styled.InputStyled>

                  <Styled.TextLabel>{`No. of Games Remaining:   ${
                    +limitData.numberOfGames - +limitData.gamesUsed || '0'
                  }`}</Styled.TextLabel>
                  <Styled.InputStyled>
                    <TextField
                      value={limitData.expirationDate || ''}
                      onChange={() => null}
                      type="text"
                      name="expirationDate"
                      height="38px"
                      label={limitLabels.expirationDate}
                      isLabelTop
                      labelFontSize="14px"
                      isReadOnly={!isEditMode}
                      isEditMode={isEditMode}
                      withBorder={isEditMode}
                      colorGrey
                      error={errors['expirationDate']}
                      isAutoCompleteOff
                      onClick={toggleCalendar}
                      inputFullWidth
                    />
                  </Styled.InputStyled>
                </Styled.FormWrapper>

                {isEditMode && (
                  <Styled.ButtonWraper>
                    <Button
                      title="Save"
                      type="submit"
                      color={COLORS.lightBlue}
                      onClick={handleSubmit}
                    />
                  </Styled.ButtonWraper>
                )}
                {isEditMode && isShowCalendar && (
                  <CalendarForm
                    calendarHandler={calendarHandler}
                    toggleCalendar={toggleCalendar}
                    calendarRef={calendarRef}
                  />
                )}
              </Styled.Container>
            </>
          );
        }}
      </Formik>
    </>
  );
};
