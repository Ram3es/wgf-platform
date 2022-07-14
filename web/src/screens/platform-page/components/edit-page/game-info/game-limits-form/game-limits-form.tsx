import { FC } from 'react';
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

export const GameLimitsForm: FC<IGameLimitsFormProps> = ({
  limitData,
  limitChange,
  isEditMode,
  editMode,
  setLimitSetting,
  toggleDrop,
  isShowSelect,
  unlimitedHandler,
  toggleCalendar,
  isShowCalendar,
  calendarHandler,
  calendarRef,
}) => {
  const handleSubmit = (values: IInitialLimitsState) => {
    editMode();
    setLimitSetting(values);
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
            toggleDrop?.({ [name]: false });
          };

          return (
            <>
              <Styled.FormItem>
                <Styled.InputStyled>
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
                    showSelect={toggleDrop}
                    isShowSelect={isShowSelect}
                    setUnlimited={unlimitedHandler}
                    isAutoCompleteOff
                  />
                </Styled.InputStyled>
              </Styled.FormItem>
              <Styled.FormItem>
                <Styled.InputStyled>
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
                    showSelect={toggleDrop}
                    isShowSelect={isShowSelect}
                    setUnlimited={unlimitedHandler}
                    isAutoCompleteOff
                  />
                </Styled.InputStyled>
              </Styled.FormItem>
              <Styled.FormItem>
                <TextField
                  value={limitData.gamesUsed || ''}
                  type="text"
                  name="gamesUsed"
                  onChange={handleUserChange}
                  height="38px"
                  label={limitLabels.gamesUsed}
                  isLabelTop
                  isReadOnly
                  labelFontSize="14px"
                  colorGrey
                  isAutoCompleteOff
                />
              </Styled.FormItem>
              <Styled.FormItem>
                <Styled.InputStyled>
                  <TextField
                    value={limitData.gameDuration || ''}
                    type="text"
                    name="gameDuration"
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
                  />
                </Styled.InputStyled>
              </Styled.FormItem>
              <Styled.FormItem>
                <TextField
                  value={+limitData.numberOfGames - +limitData.gamesUsed || '0'}
                  type="text"
                  name="remainingGames"
                  onChange={handleUserChange}
                  height="38px"
                  label={limitLabels.remainingGames}
                  isLabelTop
                  labelFontSize="14px"
                  isReadOnly
                  colorGrey
                />
              </Styled.FormItem>
              <Styled.FormItem>
                <Styled.InputStyled>
                  <TextField
                    value={limitData.expirationDate || ''}
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
                  />
                  {isEditMode && isShowCalendar && (
                    <CalendarForm
                      calendarHandler={calendarHandler}
                      toggleCalendar={toggleCalendar}
                      calendarRef={calendarRef}
                    />
                  )}
                </Styled.InputStyled>
              </Styled.FormItem>
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
            </>
          );
        }}
      </Formik>
    </>
  );
};
