import { Formik } from 'formik';
import React, { ChangeEvent, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

import { Button } from '@components/button';
import { Checkbox } from '@components/checkbox';
import { TextField } from '@components/text-field';
import { COLORS } from '@styles/colors';

import { storageService } from '@services/storage/storage';
import { signIn } from '@services/user.service';

import { errorMessage, UserErrorMessages } from '@constants/pop-up-messages';
import { ROUTES } from '@constants/routes';
import { STRINGS } from '@constants/strings';
import { Toast } from '@constants/toasts';
import { initialLoginData, LoginFormSchema } from './sign-in.constants';

import { TitleStyles } from '@styles/components/title-styles';
import { FormStyles } from '../../styles/components/form.styles';
import { SignInStyles } from './sign-in.styles';

export const SignIn: React.FC = () => {
  const { replace, goBack } = useHistory();

  useEffect(() => {
    const user = storageService.getUser();
    const token = storageService.getToken();

    if (user && token) {
      return replace('/');
    }
  }, []);

  const [isRemember, setIsRemember] = useState<boolean>(false);
  const [loginData, setLoginData] = useState(initialLoginData);
  const [createdUser, setCreatedUser] = useState<IUser>();

  const checkboxHandler = () => {
    setIsRemember((prev) => !prev);
  };

  useEffect(() => {
    if (createdUser) {
      return goBack();
    }
  }, [createdUser]);

  const redirectToSignUp = () => {
    replace(ROUTES.signUp);
  };

  const loginHandler = async () => {
    try {
      const { data } = await signIn(loginData);

      Toast.fire({
        icon: 'success',
        title: 'Signed in successfully',
      });

      setCreatedUser(data.user);
      storageService.setToken(data.token, isRemember);
      storageService.setUser(data.user);
    } catch (error) {
      if (error.response?.status === 400) {
        return UserErrorMessages['400'].fire();
      }
      if (error.response?.status === 404) {
        return UserErrorMessages['404'].fire();
      }

      return errorMessage(error.response?.data.message).fire();
    }
  };

  const onChangeLogin = (event: ChangeEvent<HTMLInputElement>) => {
    setLoginData((prev) => ({
      ...prev,
      [event.target.name]: event.target.value.trim(),
    }));
  };

  return (
    <Formik
      initialValues={loginData}
      validateOnChange
      onSubmit={loginHandler}
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
          onChangeLogin(event);
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
                      value={loginData.email}
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
                      value={loginData.password}
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
                </SignInStyles.Settings>
                <Button
                  title={STRINGS.button.signIn}
                  onClick={handleSubmit}
                  color={COLORS.greenLite}
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
