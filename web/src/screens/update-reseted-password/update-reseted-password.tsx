import axios from 'axios';
import { Formik } from 'formik';
import React, { useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';

import { Backdrop } from '@components/backdrop';
import { Button } from '@components/button';
import { Header } from '@components/header';
import { Icon } from '@components/icon';
import { TextField } from '@components/text-field';
import { loginUser } from '@store/reducers/user.slice';
import { COLORS } from '@styles/colors';

import { useAppDispatch } from '@services/hooks/redux';
import { storageService } from '@services/storage/storage';
import { updateResetedPassword } from '@services/user.service';

import { errorMessage } from '@constants/pop-up-messages';
import { ROUTES } from '@constants/routes';
import { STRINGS } from '@constants/strings';
import { Toast } from '@constants/toasts';
import {
    UpdatePasswordFormSchema, updatePasswordInitial
} from './update-reseted-password.constants';

import { FormStyles } from '@styles/components/form.styles';
import { TitleStyles } from '@styles/components/title-styles';
import { UpdateResetedPasswordStyles as Styled } from './update-reseted-password.styles';

export const UpdateResetedPassword: React.FC = () => {
  const query = new URLSearchParams(useLocation().search);
  const { replace } = useHistory();
  const [isPasswordShown, setIsPasswordShown] = useState(false);
  const [isConfirmPasswordShown, setIsConfirmPasswordShown] = useState(false);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!query.get('token')) {
      return replace('/');
    }
  }, []);

  const [updatePasswordData, setUpdatePasswordData] = useState(
    updatePasswordInitial
  );

  const redirect = () => {
    replace(ROUTES.main);
  };

  const toggleShowPassword = () => {
    setIsPasswordShown((prev) => !prev);
  };

  const toggleShowConfirmPassword = () => {
    setIsConfirmPasswordShown((prev) => !prev);
  };

  const resetPasswordHandler = async () => {
    try {
      const { data } = await updateResetedPassword({
        newPassword: updatePasswordData.newPassword,
        token: query.get('token') || '',
      });

      dispatch(loginUser(data.user));

      storageService.setToken(data.token, false);

      Toast.fire({
        icon: 'success',
        title: 'Password was changed',
      }).finally(() => {
        Toast.fire({
          icon: 'success',
          title: 'Signed in successfully',
        });
      });

      return redirect();
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
                <Styled.Wrapper>
                  <TitleStyles.h1
                    textAlign="center"
                    color={COLORS.grey}
                    mb={40}
                  >
                    {STRINGS.updatePassword.title}
                  </TitleStyles.h1>
                  <Styled.FormLabel>
                    {STRINGS.updatePassword.label}
                  </Styled.FormLabel>
                  <FormStyles.Form>
                    <FormStyles.Item>
                      <TextField
                        type={isPasswordShown ? 'text' : 'password'}
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
                      {updatePasswordData.newPassword.length ? (
                        <Styled.IconWrapper
                          onClick={toggleShowPassword}
                          error={
                            touched.newPassword && errors.newPassword
                              ? errors.newPassword
                              : ''
                          }
                        >
                          <Icon type={isPasswordShown ? 'eye' : 'eyeBlocked'} />
                        </Styled.IconWrapper>
                      ) : (
                        <></>
                      )}
                    </FormStyles.Item>
                    <FormStyles.Item>
                      <TextField
                        type={isConfirmPasswordShown ? 'text' : 'password'}
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
                      {updatePasswordData.confirmPassword.length ? (
                        <Styled.IconWrapper
                          error={
                            touched.confirmPassword && errors.confirmPassword
                              ? errors.confirmPassword
                              : ''
                          }
                          onClick={toggleShowConfirmPassword}
                        >
                          <Icon
                            type={isConfirmPasswordShown ? 'eye' : 'eyeBlocked'}
                          />
                        </Styled.IconWrapper>
                      ) : (
                        <></>
                      )}
                    </FormStyles.Item>
                  </FormStyles.Form>
                  <Styled.Footer>
                    <Button
                      title={STRINGS.button.updatePassword}
                      onClick={handleSubmit}
                      color={COLORS.lightBlue}
                      type="submit"
                      isDisabled={!isValid}
                    />
                    <Button
                      title={STRINGS.button.cancel}
                      onClick={redirect}
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
