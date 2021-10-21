import { Formik } from 'formik';
import React, { useState } from 'react';

import { Button } from '@components/button';
import { Select } from '@components/select';
import { TextField } from '@components/text-field';
import { COLORS } from '@styles/colors';

import { STRINGS } from '@constants/strings';
import { ProfileFormItems, ProfileFormSchema, profileLabels } from './profile-form.constants';

import { IProfileFormProps } from './profile-form.typings';

import { ProfileSectionFormStyles as Styled } from '../../profile.styles';

export const ProfileForm: React.FC<IProfileFormProps> = ({
  profileData,
  initialProfileData,
  profileFormSubmit,
  profileChange,
  cancelEditProfile,
  isProfileEdit,
  countryList,
  selectedCountry,
  setSelectedCountry,
}) => {
  const [isDropdownActive, setIsDropdownActive] = useState(false);

  const handleDropdown = (value: boolean) => {
    setIsDropdownActive(value);
  };

  const openDropdown = () => {
    setIsDropdownActive(true);
  };

  return (
    <>
      {profileData && initialProfileData && (
        <Formik
          initialValues={initialProfileData}
          validateOnChange
          onSubmit={profileFormSubmit}
          validationSchema={ProfileFormSchema}
          enableReinitialize
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
              profileChange(event);
            };
            return (
              <>
                {ProfileFormItems.map((item, index) => {
                  const key = item as keyof IProfileData;

                  return (
                    <Styled.FormWrapper key={index}>
                      <Styled.FormItem>
                        <TextField
                          type="text"
                          name={item}
                          placeholder=""
                          onChange={handleUserChange}
                          onBlur={handleBlur}
                          value={profileData[key] || ''}
                          error={
                            touched[key] && errors[key] && isProfileEdit
                              ? errors[key]
                              : ''
                          }
                          readOnly={item === 'created' ? true : !isProfileEdit}
                          withBorder
                          height="38px"
                          label={profileLabels[item]}
                        />
                      </Styled.FormItem>
                    </Styled.FormWrapper>
                  );
                })}
                <Styled.FormWrapper>
                  <Styled.FormItem>
                    <TextField
                      type="text"
                      name="country"
                      value={profileData.country || ''}
                      readOnly={!isProfileEdit}
                      withBorder
                      height="38px"
                      onClick={isProfileEdit ? openDropdown : undefined}
                      isAutoCompleteOff
                      label={profileLabels.country}
                    />
                    {isDropdownActive && (
                      <Styled.SelectWrapper>
                        <Select
                          isFullWidth
                          options={countryList}
                          selected={selectedCountry}
                          setSelected={setSelectedCountry}
                          setIsActive={handleDropdown}
                        />
                      </Styled.SelectWrapper>
                    )}
                  </Styled.FormItem>
                </Styled.FormWrapper>
                {isProfileEdit && (
                  <Styled.FormControl>
                    <Button
                      color={COLORS.blue}
                      title={STRINGS.button.save}
                      onClick={handleSubmit}
                      type="submit"
                      isDisabled={
                        !isValid ||
                        (!dirty &&
                          initialProfileData.country === profileData.country)
                      }
                    />
                    <Button
                      variant="cancel"
                      title={STRINGS.button.cancel}
                      onClick={cancelEditProfile}
                    />
                  </Styled.FormControl>
                )}
              </>
            );
          }}
        </Formik>
      )}
    </>
  );
};
