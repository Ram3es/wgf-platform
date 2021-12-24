import { Formik } from 'formik';
import React from 'react';

import { Button } from '@components/button';
import { Loader } from '@components/loader';
import { TextField } from '@components/text-field';
import { COLORS } from '@styles/colors';

import { useTrainerRequestState } from './trainer-request.state';

import { PROMISES_AREA } from '@constants/promises-area';
import { STRINGS } from '@constants/strings';
import { TrainerRequestFormSchema } from './trainer-request.constants';

import { TitleStyles } from '@styles/components/title-styles';
import { TrainerRequestStyled as Styled } from './trainer-request.styles';

export const TrainerRequest: React.FC = () => {
  const { trainerEmail, handleEmailChange, sendRequest } =
    useTrainerRequestState();

  return (
    <Styled.Wrapper>
      <Styled.Content>
        <TitleStyles.h2 color={COLORS.grey} textAlign="left">
          {STRINGS.trainer.requestTitle}
        </TitleStyles.h2>
        <Formik
          initialValues={{ email: trainerEmail }}
          validateOnChange
          onSubmit={sendRequest}
          validationSchema={TrainerRequestFormSchema}
        >
          {({
            errors,
            touched,
            handleBlur,
            handleChange,
            isValid,
            handleSubmit,
          }) => {
            const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
              handleChange(event);
              handleEmailChange(event);
            };
            return (
              <Styled.FormWrapper>
                <Styled.FormLabelWrapper>
                  <TextField
                    type="text"
                    name="email"
                    value={trainerEmail}
                    isFullWidth
                    withBorder
                    height="38px"
                    onChange={onChange}
                    onBlur={handleBlur}
                    error={touched.email && errors.email ? errors.email : ''}
                    label={STRINGS.input.email}
                  />
                </Styled.FormLabelWrapper>
                <Styled.FormControl>
                  <Loader area={PROMISES_AREA.requestTrainer}>
                    <Button
                      isDisabled={!isValid}
                      onClick={handleSubmit}
                      title={STRINGS.button.sendRequest}
                      color={COLORS.lightBlue}
                      iconType="requestTrainer"
                      type="submit"
                    />
                  </Loader>
                </Styled.FormControl>
              </Styled.FormWrapper>
            );
          }}
        </Formik>
      </Styled.Content>
    </Styled.Wrapper>
  );
};
