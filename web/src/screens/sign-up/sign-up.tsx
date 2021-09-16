import { Formik } from 'formik';
import React from 'react';

import { Button } from '@components/button';
import { TextField } from '@components/text-field';
import { COLORS } from '@styles/colors';

import { useSignUpState } from './sign-up.state';

import { STRINGS } from '@constants/strings';
import { UserFormSchema } from './sign-up.constants';

import { TitleStyles } from '@styles/components/title-styles';
import { FormStyles } from '../../styles/components/form.styles';
import { SignUpStyles } from './sign-up.styles';

export const SignUp: React.FC = () => {
  const { onChangeUser, signUpHandler, redirectToSignIn, signUpData } =
    useSignUpState();

  return (
    <Formik
      initialValues={signUpData}
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
            <FormStyles.Wrapper>
              <SignUpStyles.Wrapper>
                <TitleStyles.h1 textAlign="center" color={COLORS.grey} mb={40}>
                  {STRINGS.signUp.title}
                </TitleStyles.h1>
                <SignUpStyles.FormLabel>
                  {STRINGS.signUp.label}
                </SignUpStyles.FormLabel>
                <FormStyles.Form>
                  <FormStyles.Item>
                    <TextField
                      type="text"
                      name="firstName"
                      placeholder={STRINGS.input.firstName}
                      onChange={handleUserChange}
                      onBlur={handleBlur}
                      value={signUpData.firstName}
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
                      value={signUpData.lastName}
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
                      value={signUpData.email}
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
                      value={signUpData.password}
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
                <SignUpStyles.Footer>
                  <Button
                    title={STRINGS.button.signUp}
                    onClick={handleSubmit}
                    color={COLORS.greenLite}
                    type="submit"
                    isDisabled={!isValid}
                    minWidth={150}
                  />
                  <Button
                    title={STRINGS.button.returnSignIn}
                    onClick={redirectToSignIn}
                    variant="text"
                    color={COLORS.blue}
                  />
                </SignUpStyles.Footer>
              </SignUpStyles.Wrapper>
            </FormStyles.Wrapper>
          </FormStyles.Section>
        );
      }}
    </Formik>
  );
};
