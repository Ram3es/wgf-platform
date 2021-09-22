import { Formik } from 'formik';
import React from 'react';

import { Button } from '@components/button';
import { Checkbox } from '@components/checkbox';
import { TextField } from '@components/text-field';
import { COLORS } from '@styles/colors';

import { useSignInState } from './sign-in.state';

import { STRINGS } from '@constants/strings';
import { LoginFormSchema } from './sign-in.constants';

import { TitleStyles } from '@styles/components/title-styles';
import { FormStyles } from '../../styles/components/form.styles';
import { SignInStyles } from './sign-in.styles';

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
              <SignInStyles.Wrapper>
                <TitleStyles.h1 mb={40} color={COLORS.grey} textAlign="center">
                  {STRINGS.signIn.title}
                </TitleStyles.h1>
                <SignInStyles.FormLabel>
                  {STRINGS.signIn.label}
                </SignInStyles.FormLabel>
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
                      error={touched.email && errors.email ? errors.email : ''}
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
                <SignInStyles.Settings>
                  <Checkbox
                    label={STRINGS.signIn.checkRemember}
                    onChange={checkboxHandler}
                    isChecked={isRemember}
                    boxWidth={20}
                    boxHeight={20}
                  />
                  <Button
                    title={STRINGS.button.forgetPassword}
                    onClick={redirectToResetPassword}
                    color={COLORS.blue}
                    variant="text"
                  />
                </SignInStyles.Settings>
                <Button
                  title={STRINGS.button.signIn}
                  onClick={handleSubmit}
                  color={COLORS.blue}
                  type="submit"
                  isDisabled={!isValid}
                  minWidth={170}
                />
                <SignInStyles.Footer>
                  <span>{STRINGS.signIn.notMember}</span>
                  <Button
                    title={STRINGS.button.signUpNow}
                    onClick={redirectToSignUp}
                    color={COLORS.blue}
                    variant="text"
                  />
                </SignInStyles.Footer>
              </SignInStyles.Wrapper>
            </FormStyles.Wrapper>
          </FormStyles.Section>
        );
      }}
    </Formik>
  );
};
