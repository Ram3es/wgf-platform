import axios from 'axios';
import { Formik } from 'formik';
import React, { useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';

import { Button } from '@components/button';
import { TextField } from '@components/text-field';
import { COLORS } from '@styles/colors';

import { updatePassword } from '@services/user.service';

import { errorMessage } from '@constants/pop-up-messages';
import { ROUTES } from '@constants/routes';
import { STRINGS } from '@constants/strings';
import { Toast } from '@constants/toasts';
import { UpdatePasswordFormSchema, updatePasswordInitial } from './update-password.constants';

import { FormStyles } from '@styles/components/form.styles';
import { TitleStyles } from '@styles/components/title-styles';
import { UpdatePasswordStyles } from './update-password.styles';

export const UpdatePassword: React.FC = () => {
  const query = new URLSearchParams(useLocation().search);

  useEffect(() => {
    if (!query.get('token')) {
      return replace('/');
    }
  }, []);

  const [updatePasswordData, setUpdatePasswordData] = useState(
    updatePasswordInitial
  );

  const { replace } = useHistory();

  const redirectToSignIn = () => {
    replace(ROUTES.signIn);
  };

  const resetPasswordHandler = async () => {
    try {
      await updatePassword({
        email: updatePasswordData.email,
        newPassword: updatePasswordData.newPassword,
        token: query.get('token') || '',
      });

      Toast.fire({
        icon: 'success',
        title: 'Password was changed',
      });

      return redirectToSignIn();
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return errorMessage(error?.response?.data.message).fire();
      }
    }
  };

  return (
    <Formik
      initialValues={updatePasswordData}
      validateOnChange
      onSubmit={resetPasswordHandler}
      validationSchema={UpdatePasswordFormSchema}
    >
      {({
        errors,
        touched,
        handleBlur,
        handleChange,
        isValid,
        handleSubmit,
      }) => {
        const handlePasswordChange = (
          event: React.ChangeEvent<HTMLInputElement>
        ) => {
          handleChange(event);
          setUpdatePasswordData((prev) => ({
            ...prev,
            [event.target.name]: event.target.value,
          }));
        };

        return (
          <FormStyles.Section>
            <FormStyles.Wrapper>
              <UpdatePasswordStyles.Wrapper>
                <TitleStyles.h1 textAlign="center" color={COLORS.grey} mb={40}>
                  {STRINGS.updatePassword.title}
                </TitleStyles.h1>
                <UpdatePasswordStyles.FormLabel>
                  {STRINGS.updatePassword.label}
                </UpdatePasswordStyles.FormLabel>
                <FormStyles.Form>
                  <FormStyles.Item>
                    <TextField
                      type="text"
                      name="email"
                      placeholder={STRINGS.input.email}
                      onChange={handlePasswordChange}
                      onBlur={handleBlur}
                      value={updatePasswordData.email}
                      tabIndex={1}
                      autoCapitalize="none"
                      error={touched.email && errors.email ? errors.email : ''}
                      isFullWidth
                    />
                  </FormStyles.Item>
                  <FormStyles.Item>
                    <TextField
                      type="password"
                      name="newPassword"
                      placeholder={STRINGS.input.newPassword}
                      onChange={handlePasswordChange}
                      onBlur={handleBlur}
                      value={updatePasswordData.newPassword}
                      tabIndex={2}
                      autoCapitalize="none"
                      error={
                        touched.newPassword && errors.newPassword
                          ? errors.newPassword
                          : ''
                      }
                      isFullWidth
                    />
                  </FormStyles.Item>
                  <FormStyles.Item>
                    <TextField
                      type="password"
                      name="confirmPassword"
                      placeholder={STRINGS.input.confirmPassword}
                      onChange={handlePasswordChange}
                      onBlur={handleBlur}
                      value={updatePasswordData.confirmPassword}
                      tabIndex={3}
                      autoCapitalize="none"
                      error={
                        touched.confirmPassword && errors.confirmPassword
                          ? errors.confirmPassword
                          : ''
                      }
                      isFullWidth
                    />
                  </FormStyles.Item>
                </FormStyles.Form>
                <UpdatePasswordStyles.Footer>
                  <Button
                    title={STRINGS.button.updatePassword}
                    onClick={handleSubmit}
                    color={COLORS.blue}
                    type="submit"
                    isDisabled={!isValid}
                  />
                  <Button
                    title={STRINGS.button.cancel}
                    onClick={redirectToSignIn}
                    variant="cancel"
                    color={COLORS.blue}
                  />
                </UpdatePasswordStyles.Footer>
              </UpdatePasswordStyles.Wrapper>
            </FormStyles.Wrapper>
          </FormStyles.Section>
        );
      }}
    </Formik>
  );
};
