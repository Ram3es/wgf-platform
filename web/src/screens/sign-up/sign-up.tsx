import { Formik } from 'formik';
import React from 'react';

import { Backdrop } from '@components/backdrop';
import { Button } from '@components/button';
import { Header } from '@components/header';
import { Icon } from '@components/icon';
import { Loader } from '@components/loader';
import { SocialAuth } from '@components/social-auth';
import { TextField } from '@components/text-field';
import { COLORS } from '@styles/colors';

import { useSignUpState } from './sign-up.state';

import { PROMISES_AREA } from '@constants/promises-area';
import { STRINGS } from '@constants/strings';
import { UserFormSchema } from './sign-up.constants';

import { FormStyles } from '@styles/components/form.styles';
import { TitleStyles } from '@styles/components/title-styles';
import { SignUpStyles as Styled } from './sign-up.styles';

export const SignUp: React.FC = () => {
  const {
    onChangeUser,
    signUpHandler,
    redirectToSignIn,
    state,
    isPasswordShown,
    toggleShowPassword,
  } = useSignUpState();

  return (
    <>
      <Header />
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
            <FormStyles.Section>
              <Backdrop />
              <FormStyles.Wrapper>
                <Styled.Wrapper>
                  <TitleStyles.h1
                    textAlign="center"
                    color={COLORS.grey}
                    mb={40}
                  >
                    {STRINGS.signUp.title}
                  </TitleStyles.h1>
                  <Styled.FormLabel>{STRINGS.signUp.label}</Styled.FormLabel>
                  <FormStyles.Form>
                    <FormStyles.Item>
                      <TextField
                        type="text"
                        name="firstName"
                        placeholder={STRINGS.input.firstName}
                        onChange={handleUserChange}
                        onBlur={handleBlur}
                        value={state.firstName}
                        tabIndex={1}
                        error={
                          touched.firstName && errors.firstName
                            ? errors.firstName
                            : ''
                        }
                        isFullWidth
                      />
                    </FormStyles.Item>
                    <FormStyles.Item>
                      <TextField
                        type="text"
                        name="lastName"
                        placeholder={STRINGS.input.lastName}
                        onChange={handleUserChange}
                        onBlur={handleBlur}
                        value={state.lastName}
                        tabIndex={2}
                        error={
                          touched.lastName && errors.lastName
                            ? errors.lastName
                            : ''
                        }
                        isFullWidth
                      />
                    </FormStyles.Item>
                    <FormStyles.Item>
                      <TextField
                        type="text"
                        name="email"
                        placeholder={STRINGS.input.email}
                        onChange={handleUserChange}
                        onBlur={handleBlur}
                        value={state.email}
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
                        type={isPasswordShown ? 'text' : 'password'}
                        name="password"
                        placeholder={STRINGS.input.password}
                        onChange={handleUserChange}
                        onBlur={handleBlur}
                        value={state.password}
                        tabIndex={4}
                        autoCapitalize="none"
                        error={
                          touched.password && errors.password
                            ? errors.password
                            : ''
                        }
                        isFullWidth
                      />
                      {state.password.length ? (
                        <Styled.IconWrapper
                          error={
                            touched.password && errors.password
                              ? errors.password
                              : ''
                          }
                          onClick={toggleShowPassword}
                        >
                          <Icon type={isPasswordShown ? 'eye' : 'eyeBlocked'} />
                        </Styled.IconWrapper>
                      ) : (
                        <></>
                      )}
                    </FormStyles.Item>
                  </FormStyles.Form>
                  <Loader area={PROMISES_AREA.auth}>
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
                    <SocialAuth />
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
