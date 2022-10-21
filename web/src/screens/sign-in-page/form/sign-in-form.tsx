import React from 'react';
import { Formik } from 'formik';

import { STRINGS } from '@constants/strings';
import { PROMISES_AREA } from '@constants/promises-area';

import { Icon } from '@components/icon';
import { Loader } from '@components/loader';
import { Button } from '@components/button';
import { Checkbox } from '@components/checkbox';
import { TextField } from '@components/text-field';
import { SocialAuth } from '@components/social-auth';

import { COLORS } from '@styles/colors';

import { useSignInState } from './sign-in-form.state';
import { LoginFormSchema } from './sign-in.constants';
import { FormStyles as Styled } from './sign-in.styles';

export const SignInForm = () => {
  const {
    onChangeSignInData,
    signInHandler,
    redirectToSignUp,
    checkboxHandler,
    redirectToResetPassword,
    signInData,
    isRemember,
    isPasswordShown,
    toggleShowPassword,
  } = useSignInState();
  return (
    <>
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
            <>
              <Styled.FormCard>
                <Styled.Title>{STRINGS.signIn.title}</Styled.Title>
                <Styled.FormLabel>{STRINGS.signIn.label}</Styled.FormLabel>
                <SocialAuth />
                <TextField
                  type="text"
                  name="email"
                  placeholder="* Email"
                  value={signInData.email}
                  withBorder
                  onChange={handleUserChange}
                  onBlur={handleBlur}
                  error={touched.email && errors.email ? errors.email : ''}
                />
                <TextField
                  type={isPasswordShown ? 'text' : 'password'}
                  name="password"
                  placeholder="* Password"
                  value={signInData.password}
                  withBorder
                  onChange={handleUserChange}
                  onBlur={handleBlur}
                  error={
                    touched.password && errors.password ? errors.password : ''
                  }
                />
                {signInData.password.length ? (
                  <Styled.IconWrapper
                    error={
                      touched.password && errors.password ? errors.password : ''
                    }
                    onClick={toggleShowPassword}
                  >
                    <Icon type={isPasswordShown ? 'eye' : 'eyeBlocked'} />
                  </Styled.IconWrapper>
                ) : (
                  <></>
                )}
                <Loader area={PROMISES_AREA.auth}>
                  <Styled.Wrapper>
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
                        color={COLORS.lightBlue}
                        variant="text"
                      />
                    </Styled.Settings>
                    <Button
                      title={STRINGS.button.signIn}
                      onClick={handleSubmit}
                      color={COLORS.lightBlue}
                      type="submit"
                      isDisabled={!isValid}
                      minWidth={170}
                    />
                    <Styled.Footer>
                      <span>{STRINGS.signIn.notMember}</span>
                      <Button
                        title={STRINGS.button.signUpNow}
                        onClick={redirectToSignUp}
                        color={COLORS.lightBlue}
                        variant="text"
                      />
                    </Styled.Footer>
                  </Styled.Wrapper>
                </Loader>
              </Styled.FormCard>
            </>
          );
        }}
      </Formik>
    </>
  );
};
