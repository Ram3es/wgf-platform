import axios from 'axios';
import { Formik } from 'formik';
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

import { Backdrop } from '@components/backdrop';
import { Button } from '@components/button';
import { Header } from '@components/header';
import { TextField } from '@components/text-field';
import { COLORS } from '@styles/colors';

import { resetPassword } from '@services/user.service';

import { errorMessage } from '@constants/pop-up-messages';
import { ROUTES } from '@constants/routes';
import { STRINGS } from '@constants/strings';
import { Toast } from '@constants/toasts';
import { EmailFormSchema } from './reset-password.constants';

import { FormStyles } from '@styles/components/form.styles';
import { TitleStyles } from '@styles/components/title-styles';
import { ResetPasswordStyles as Styled } from './reset-password.styles';

export const ResetPassword: React.FC = () => {
  const [resetPasswordData, setResetPasswordData] = useState({ email: '' });

  const { replace } = useHistory();

  const redirectToSignIn = () => {
    replace(ROUTES.signIn);
  };

  const resetPasswordHandler = async () => {
    try {
      await resetPassword(resetPasswordData);

      Toast.fire({
        icon: 'info',
        title: 'Email was sent',
      });

      return replace('/');
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return errorMessage(error?.response?.data.message).fire();
      }
    }
  };

  return (
    <>
      <Header />
      <Backdrop />
      <Formik
        initialValues={resetPasswordData}
        validateOnChange
        onSubmit={resetPasswordHandler}
        validationSchema={EmailFormSchema}
      >
        {({
          errors,
          touched,
          handleBlur,
          handleChange,
          isValid,
          handleSubmit,
        }) => {
          const handleDataChange = (
            event: React.ChangeEvent<HTMLInputElement>
          ) => {
            handleChange(event);
            setResetPasswordData((prev) => ({
              ...prev,
              email: event.target.value,
            }));
          };

          return (
            <FormStyles.Section>
              <FormStyles.Wrapper>
                <Styled.Wrapper>
                  <TitleStyles.h1
                    textAlign="center"
                    color={COLORS.grey}
                    mb={40}
                  >
                    {STRINGS.resetPassword.title}
                  </TitleStyles.h1>
                  <Styled.FormLabel>
                    {STRINGS.resetPassword.label}
                  </Styled.FormLabel>
                  <FormStyles.Form>
                    <FormStyles.Item>
                      <TextField
                        type="text"
                        name="email"
                        placeholder={STRINGS.input.email}
                        onChange={handleDataChange}
                        onBlur={handleBlur}
                        value={resetPasswordData.email}
                        tabIndex={1}
                        autoCapitalize="none"
                        error={
                          touched.email && errors.email ? errors.email : ''
                        }
                        isFullWidth
                      />
                    </FormStyles.Item>
                  </FormStyles.Form>
                  <Styled.Footer>
                    <Button
                      title={STRINGS.button.resetPassword}
                      onClick={handleSubmit}
                      color={COLORS.lightBlue}
                      type="submit"
                      isDisabled={!isValid}
                      minWidth={150}
                    />
                    <Button
                      title={STRINGS.button.cancel}
                      onClick={redirectToSignIn}
                      variant="cancel"
                      color={COLORS.lightBlue}
                    />
                  </Styled.Footer>
                </Styled.Wrapper>
              </FormStyles.Wrapper>
            </FormStyles.Section>
          );
        }}
      </Formik>
    </>
  );
};
