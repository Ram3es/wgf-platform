import { Formik } from 'formik';
import React from 'react';

import { Button } from '@components/button';
import { DropDown } from '@components/drop-down';
import { Loader } from '@components/loader';
import { TextField } from '@components/text-field';
import { COLORS } from '@styles/colors';
import { FlexCenter } from '@styles/components/flex-center';

import { useIndividualInviteState } from './individual-invite.state';

import { PROMISES_AREA } from '@constants/promises-area';
import { STRINGS } from '@constants/strings';
import { ROLES } from '@constants/user-roles';
import {
    groupTypeOptions, individualInviteFormItems, IndividualInviteFormSchema, individualInviteLabels,
    initialIndividualInviteState
} from './individual-invite.constants';

import { IInitialIndividualInviteState } from './individual-invite.typings';

import { IndividualInviteStyled as Styled } from './individual-invite.styles';

export const IndividualInvite: React.FC = () => {
  const {
    state,
    isActiveDropdown,
    assignGroupsOptions,
    user,
    handleChangeGroupType,
    handleChangeAssignGroup,
    handleChangeInviteData,
    openDropdown,
    setIsActiveDropdown,
    handleSubmitInviteFromTrainer,
    handleSubmitInviteFromSuperAdmin,
  } = useIndividualInviteState();

  return (
    <Styled.Wrapper>
      <Styled.Title>{STRINGS.invitation.individualInvite}</Styled.Title>
      <Formik
        initialValues={initialIndividualInviteState}
        validateOnChange
        onSubmit={
          user.role === ROLES.superAdmin
            ? handleSubmitInviteFromSuperAdmin
            : handleSubmitInviteFromTrainer
        }
        validationSchema={IndividualInviteFormSchema}
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
            handleChangeInviteData(event);
          };
          return (
            <>
              {individualInviteFormItems.map((item, index) => {
                const key = item as keyof IInitialIndividualInviteState;

                return (
                  <Styled.FormWrapper key={index}>
                    <TextField
                      type="text"
                      name={item}
                      placeholder=""
                      onChange={handleUserChange}
                      onBlur={handleBlur}
                      value={state[key]}
                      error={touched[key] && errors[key] ? errors[key] : ''}
                      withBorder
                      height="38px"
                      label={individualInviteLabels[item]}
                    />
                  </Styled.FormWrapper>
                );
              })}
              {user.role === ROLES.trainerAdmin && (
                <Styled.FormWrapper>
                  <TextField
                    type="text"
                    name="assignGroup"
                    value={state.assignGroup}
                    withBorder
                    height="38px"
                    onClick={openDropdown}
                    isAutoCompleteOff
                    isSelect
                    label="Assign Group"
                    onChange={handleUserChange}
                  />
                  {isActiveDropdown && (
                    <Styled.SelectWrapper>
                      <DropDown
                        isFullWidth
                        options={assignGroupsOptions}
                        selected={state.assignGroup}
                        setSelected={handleChangeAssignGroup}
                        setIsActive={setIsActiveDropdown}
                      />
                    </Styled.SelectWrapper>
                  )}
                </Styled.FormWrapper>
              )}
              {user.role === ROLES.superAdmin && (
                <Styled.FormWrapper>
                  <TextField
                    type="text"
                    name="groupType"
                    value={state.groupType}
                    onChange={handleUserChange}
                    withBorder
                    height="38px"
                    onClick={openDropdown}
                    isAutoCompleteOff
                    isSelect
                    label="Group Type"
                  />
                  {isActiveDropdown && (
                    <Styled.SelectWrapper>
                      <DropDown
                        isFullWidth
                        options={groupTypeOptions}
                        selected={state.groupType}
                        setSelected={handleChangeGroupType}
                        setIsActive={setIsActiveDropdown}
                      />
                    </Styled.SelectWrapper>
                  )}
                </Styled.FormWrapper>
              )}
              <FlexCenter>
                <Loader
                  area={
                    user.role === ROLES.superAdmin
                      ? PROMISES_AREA.inviteFromSuperAdmin
                      : PROMISES_AREA.inviteStudent
                  }
                >
                  <Button
                    color={COLORS.blue}
                    title={STRINGS.button.invite}
                    onClick={handleSubmit}
                    type="submit"
                    isDisabled={!isValid}
                    iconType="invite"
                  />
                </Loader>
              </FlexCenter>
            </>
          );
        }}
      </Formik>
    </Styled.Wrapper>
  );
};
