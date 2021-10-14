import { Formik } from 'formik';
import React from 'react';

import { Backdrop } from '@components/backdrop';
import { Button } from '@components/button';
import { Checkbox } from '@components/checkbox';
import { Header } from '@components/header';
import { Loader } from '@components/loader';
import { TextField } from '@components/text-field';
import { COLORS } from '@styles/colors';

import { useSignInState } from './sign-in.state';

import { PROMISES_AREA } from '@constants/promises-area';
import { STRINGS } from '@constants/strings';
import { LoginFormSchema } from './sign-in.constants';

import { TitleStyles } from '@styles/components/title-styles';
import { FormStyles } from '../../styles/components/form.styles';
import { SignInStyles as Styled } from './sign-in.styles';

export const SignIn: React.FC = () => {
  const {
    onChangeSignInData,
    signInHandler,
    redirectToSignUp,
    checkboxHandler,
    redirectToResetPassword,
    signInData,
    isRemember,
  } = useSignInState();
  return (
    <>
      <Header />
      <Backdrop />
      <Formik
        initialValues={signInData}
        validateOnChange
        onSubmit={signInHandler}
        validationSchema={LoginFormSchema}
      >
        {({
          errors,
          touched,
          handleBlur,
          handleChange,
          isValid,
          handleSubmit,
        }) => {
          const handleUserChange = (
            event: React.ChangeEvent<HTMLInputElement>
          ) => {
            handleChange(event);
            onChangeSignInData(event);
          };

          return (
            <FormStyles.Section>
              <FormStyles.Wrapper>
                <Styled.Wrapper>
                  <TitleStyles.h1
                    mb={40}
                    color={COLORS.grey}
                    textAlign="center"
                  >
                    {STRINGS.signIn.title}
                  </TitleStyles.h1>
                  <Styled.FormLabel>{STRINGS.signIn.label}</Styled.FormLabel>
                  <FormStyles.Form>
                    <FormStyles.Item>
                      <TextField
                        type="text"
                        name="email"
                        placeholder={STRINGS.input.email}
                        onChange={handleUserChange}
                        onBlur={handleBlur}
                        value={signInData.email}
                        tabIndex={3}
                        autoCapitalize="none"
                        error={
                          touched.email && errors.email ? errors.email : ''
                        }
                        isFullWidth
                      />
                    </FormStyles.Item>
                    <FormStyles.Item>
                      <TextField
                        type="password"
                        name="password"
                        placeholder={STRINGS.input.password}
                        onChange={handleUserChange}
                        onBlur={handleBlur}
                        value={signInData.password}
                        tabIndex={4}
                        autoCapitalize="none"
                        error={
                          touched.password && errors.password
                            ? errors.password
                            : ''
                        }
                        isFullWidth
                      />
                    </FormStyles.Item>
                  </FormStyles.Form>
                  <Styled.Settings>
                    <Checkbox
                      label={STRINGS.signIn.checkRemember}
                      onChange={checkboxHandler}
                      isChecked={isRemember}
                      boxWidth={20}
                      boxHeight={20}
                      alignItems="center"
                    />
                    <Button
                      title={STRINGS.button.forgotPassword}
                      onClick={redirectToResetPassword}
                      color={COLORS.blue}
                      variant="text"
                    />
                  </Styled.Settings>
                  <Loader area={PROMISES_AREA.signIn}>
                    <Button
                      title={STRINGS.button.signIn}
                      onClick={handleSubmit}
                      color={COLORS.blue}
                      type="submit"
                      isDisabled={!isValid}
                      minWidth={170}
                    />
                    <Styled.Footer>
                      <span>{STRINGS.signIn.notMember}</span>
                      <Button
                        title={STRINGS.button.signUpNow}
                        onClick={redirectToSignUp}
                        color={COLORS.blue}
                        variant="text"
                      />
                    </Styled.Footer>
                  </Loader>
                </Styled.Wrapper>
              </FormStyles.Wrapper>
            </FormStyles.Section>
          );
        }}
      </Formik>
    </>
  );
};
