import React, { FC } from 'react';
import { Formik } from 'formik';

import { STRINGS } from '@constants/strings';
import { PROMISES_AREA } from '@constants/promises-area';

import { Icon } from '@components/icon';
import { Loader } from '@components/loader';
import { Button } from '@components/button';
import { TextField } from '@components/text-field';
import { SocialAuth } from '@components/social-auth';
import { COLORS } from '@styles/colors';

import { UserFormSchema } from './form.constants';
import { useSignUpState } from './form.state';
import { FormStyles as Styled } from './form.styles';

export const SignUpForm: FC = () => {
  const {
    onChangeUser,
    signUpHandler,
    redirectToSignIn,
    state,
    isPasswordShown,
    toggleShowPassword,
  } = useSignUpState();

  return (
    <Formik
      initialValues={state}
      validateOnChange
      onSubmit={signUpHandler}
      validationSchema={UserFormSchema}
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
          onChangeUser(event);
        };

        return (
          <>
            <Styled.FormCard>
              <Styled.Title>{STRINGS.signUp.title}</Styled.Title>
              {/* <Styled.FormLabel>{STRINGS.signUp.label}</Styled.FormLabel> */}
              <SocialAuth />

              <TextField
                type="text"
                name="firstName"
                placeholder="* First Name"
                value={state.firstName}
                withBorder
                onChange={handleUserChange}
                onBlur={handleBlur}
                error={
                  touched.firstName && errors.firstName ? errors.firstName : ''
                }
              />
              <TextField
                type="text"
                name="lastName"
                placeholder="* Last Name"
                value={state.lastName}
                withBorder
                onChange={handleUserChange}
                onBlur={handleBlur}
                error={
                  touched.lastName && errors.lastName ? errors.lastName : ''
                }
              />
              <TextField
                type="text"
                name="email"
                placeholder="* Email"
                value={state.email}
                withBorder
                onChange={handleUserChange}
                onBlur={handleBlur}
                error={touched.email && errors.email ? errors.email : ''}
              />
              <TextField
                type={isPasswordShown ? 'text' : 'password'}
                name="password"
                placeholder="* Password"
                value={state.password}
                withBorder
                onChange={handleUserChange}
                onBlur={handleBlur}
                error={
                  touched.password && errors.password ? errors.password : ''
                }
              />
              {state.password.length ? (
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
              <Loader area={PROMISES_AREA.authSignUp}>
                <Styled.Footer>
                  <Button
                    title={STRINGS.button.signUp}
                    onClick={handleSubmit}
                    color={COLORS.lightBlue}
                    type="submit"
                    isDisabled={!isValid}
                    minWidth={150}
                  />
                  <Button
                    title={STRINGS.button.returnSignIn}
                    onClick={redirectToSignIn}
                    variant="text"
                    color={COLORS.lightBlue}
                  />
                </Styled.Footer>
              </Loader>
            </Styled.FormCard>
          </>
        );
      }}
    </Formik>
  );
};
