import { Formik } from 'formik';
import React from 'react';

import { Button } from '@components/button';
import { TextField } from '@components/text-field';
import { COLORS } from '@styles/colors';

import { STRINGS } from '@constants/strings';
import { initialAccountData } from '../../profile.constants';
import { AccountFormItems, AccountFormSchema, accountLabels } from './account-form.constants';

import { IAccountFormProps } from './account-form.typings';

import { ProfileSectionFormStyles as Styled } from '../../profile.styles';

export const AccountForm: React.FC<IAccountFormProps> = ({
  accountData,
  accountFormSubmit,
  accountChange,
  cancelEditAccount,
}) => (
  <>
    <Formik
      initialValues={initialAccountData}
      validateOnChange
      onSubmit={accountFormSubmit}
      validationSchema={AccountFormSchema}
    >
      {({
        errors,
        touched,
        handleBlur,
        handleChange,
        isValid,
        handleSubmit,
        dirty,
      }) => {
        const handleUserChange = (
          event: React.ChangeEvent<HTMLInputElement>
        ) => {
          handleChange(event);
          accountChange(event);
        };
        return (
          <>
            {AccountFormItems.map((item, index) => {
              const key = item as keyof IAccountData;

              return (
                <Styled.FormWrapper key={index}>
                  <Styled.FormItem type="password">
                    <TextField
                      type="password"
                      name={item}
                      placeholder=""
                      onChange={handleUserChange}
                      onBlur={handleBlur}
                      value={accountData[key] || ''}
                      error={touched[key] && errors[key] ? errors[key] : ''}
                      label={accountLabels[item]}
                      withBorder
                      height="38px"
                    />
                  </Styled.FormItem>
                </Styled.FormWrapper>
              );
            })}
            <Styled.FormControl>
              <Button
                color={COLORS.liteBlue}
                title={STRINGS.button.save}
                onClick={handleSubmit}
                type="submit"
                isDisabled={!isValid || !dirty}
              />
              <Button
                variant="cancel"
                title={STRINGS.button.cancel}
                onClick={cancelEditAccount}
              />
            </Styled.FormControl>
          </>
        );
      }}
    </Formik>
  </>
);
