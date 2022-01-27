import { FieldArray, Formik, FormikErrors, FormikTouched } from 'formik';
import { ChangeEvent, useEffect } from 'react';

import { Button } from '@components/button';
import { Checkbox } from '@components/checkbox';
import { Icon } from '@components/icon';
import { TextField } from '@components/text-field';
import { COLORS } from '@styles/colors';
import { SelectColumn } from './components/select-column';

import { useInvitationTableState } from './invitation-table.state';

import { ROLES } from '@constants/user-roles';
import { InvitationTableFormSchema } from './invitation-table.constants';

import { IBulkInviteData } from '../../bulk-invite.typings';
import { IInvitationTableProps } from './invitation.typings';

import { CommonStylesForTables } from '@screens/platform-page/platform-page.styles';
import { InvitationTableStyled as Styled } from './invitation-table.styles';

export const InvitationTable = (props: IInvitationTableProps) => {
  const {
    onSelectAll,
    isSelectedAll,
    user,
    invitationList,
    onSelectUser,
    onEditUser,
    onDeleteUser,
    selectedUsersCount,
    formikRef,
    setIsDisabled,
    groups,
    setInvitationList,
    onSubmit,
    tableRef,
    isActiveUser,
    handleUserActive,
    handleCloseTable,
    handleUserChange,
    isDisabled,
  } = useInvitationTableState(props);

  return (
    <CommonStylesForTables.InnerWrapper>
      <CommonStylesForTables.CheckboxWrapper>
        <Checkbox
          isMonoColor
          label="Select all"
          onChange={onSelectAll}
          isChecked={isSelectedAll}
          boxWidth={16}
          boxHeight={16}
          alignItems="center"
        />
      </CommonStylesForTables.CheckboxWrapper>
      <CommonStylesForTables.InnerTableWrapper ref={tableRef}>
        <CommonStylesForTables.Table>
          <CommonStylesForTables.HeaderRow>
            <CommonStylesForTables.ControlColumn />
            <CommonStylesForTables.ControlColumn>
              Edit
            </CommonStylesForTables.ControlColumn>
            <CommonStylesForTables.ControlColumn>
              Remove User
            </CommonStylesForTables.ControlColumn>
            <CommonStylesForTables.HeaderColumn>
              name
            </CommonStylesForTables.HeaderColumn>
            <CommonStylesForTables.HeaderColumn isBigBox>
              email
            </CommonStylesForTables.HeaderColumn>
            <CommonStylesForTables.HeaderColumn>
              {user.role === ROLES.trainerAdmin
                ? 'group name'
                : 'type of invitation'}
            </CommonStylesForTables.HeaderColumn>
          </CommonStylesForTables.HeaderRow>
          <CommonStylesForTables.DataWrapper>
            <Formik
              initialValues={{ users: invitationList }}
              validateOnChange
              onSubmit={onSubmit}
              validationSchema={InvitationTableFormSchema}
              innerRef={formikRef}
              validateOnBlur
            >
              {({
                errors,
                touched,
                handleBlur,
                handleChange,
                values,
                setFieldTouched,
              }) => {
                useEffect(() => {
                  values.users.forEach((_, index) => {
                    setFieldTouched(`users.${index}.name`, true);
                    setFieldTouched(`users.${index}.email`, true);
                  });
                }, []);

                useEffect(() => {
                  setIsDisabled(
                    values.users.some(
                      (user, index) => user.isSelected && errors.users?.[index]
                    )
                  );
                }, [values.users, errors.users]);

                return (
                  <FieldArray
                    name="users"
                    render={(arrayHeplers) => {
                      return values.users.map(
                        (
                          {
                            id,
                            name,
                            email,
                            group,
                            typeOfInvitation,
                            isSelected,
                            isEditable,
                          },
                          index
                        ) => {
                          const handleDeleteUser = () => {
                            onDeleteUser(id);
                            arrayHeplers.remove(index);
                          };

                          const onChange = (
                            event: ChangeEvent<HTMLInputElement>
                          ) => {
                            handleChange(event);
                            handleUserChange(id, event);
                          };
                          const errorType = errors.users
                            ? (errors.users[
                                index
                              ] as FormikErrors<IBulkInviteData>)
                            : { name: '', email: '' };

                          const touchedType = touched.users
                            ? (touched.users[
                                index
                              ] as FormikTouched<IBulkInviteData>)
                            : { name: '', email: '' };

                          const emailError =
                            touchedType?.email && errorType?.email
                              ? errorType?.email
                              : '';

                          const nameError =
                            touchedType?.name && errorType?.name
                              ? errorType?.name
                              : '';

                          return (
                            <CommonStylesForTables.DataRow
                              isActive={isActiveUser === id}
                              isSelected={isSelected}
                              error={nameError || emailError}
                              key={id}
                              isEditable={isEditable}
                            >
                              <CommonStylesForTables.ControlColumn>
                                <Checkbox
                                  isMonoColor
                                  label=""
                                  onChange={onSelectUser(id)}
                                  isChecked={isSelected}
                                  boxWidth={16}
                                  boxHeight={16}
                                  alignItems="center"
                                />
                              </CommonStylesForTables.ControlColumn>
                              <CommonStylesForTables.ControlColumn>
                                <CommonStylesForTables.ControlWrapper
                                  onClick={onEditUser(id)}
                                >
                                  <Icon type="edit" />
                                </CommonStylesForTables.ControlWrapper>
                              </CommonStylesForTables.ControlColumn>
                              <CommonStylesForTables.ControlColumn>
                                <CommonStylesForTables.ControlWrapper
                                  onClick={handleDeleteUser}
                                >
                                  <Icon type="bin" />
                                </CommonStylesForTables.ControlWrapper>
                              </CommonStylesForTables.ControlColumn>
                              <CommonStylesForTables.DataColumn
                                isEditable
                                onDoubleClick={onEditUser(id)}
                              >
                                <CommonStylesForTables.InputWrapper>
                                  <TextField
                                    type="text"
                                    value={name || ''}
                                    onChange={onChange}
                                    name={`users.${index}.name`}
                                    withBorder
                                    height="32px"
                                    error={!isEditable ? '' : nameError}
                                    onBlur={handleBlur}
                                    data-name="name"
                                    isTableReadOnly={!isEditable}
                                    placeholder={
                                      !isEditable && nameError ? '-' : ''
                                    }
                                  />
                                </CommonStylesForTables.InputWrapper>
                              </CommonStylesForTables.DataColumn>
                              <CommonStylesForTables.DataColumn
                                isBigBox
                                isEditable
                                onDoubleClick={onEditUser(id)}
                              >
                                <CommonStylesForTables.InputWrapper>
                                  <TextField
                                    type="text"
                                    value={email || ''}
                                    onChange={onChange}
                                    name={`users.${index}.email`}
                                    withBorder
                                    height="32px"
                                    error={!isEditable ? '' : emailError}
                                    onBlur={handleBlur}
                                    data-name="email"
                                    isTableReadOnly={!isEditable}
                                    placeholder={
                                      !isEditable && emailError ? '-' : ''
                                    }
                                  />
                                </CommonStylesForTables.InputWrapper>
                              </CommonStylesForTables.DataColumn>
                              <SelectColumn
                                existingTrainerGroups={groups}
                                group={group || ''}
                                setInvitationList={setInvitationList}
                                typeOfInvitation={typeOfInvitation}
                                id={id}
                                handleUserActive={handleUserActive}
                                formikRef={formikRef}
                              />
                            </CommonStylesForTables.DataRow>
                          );
                        }
                      );
                    }}
                  />
                );
              }}
            </Formik>
          </CommonStylesForTables.DataWrapper>
        </CommonStylesForTables.Table>
      </CommonStylesForTables.InnerTableWrapper>
      <Styled.SelectedUsersCount>
        {selectedUsersCount} selected
      </Styled.SelectedUsersCount>
      <Styled.ControlPanel>
        <Button
          title="Return"
          onClick={handleCloseTable}
          color="rgba(0,174,239,0.4)"
          iconType="back"
        />
        <Button
          type="submit"
          onClick={isDisabled || !selectedUsersCount ? undefined : onSubmit}
          title="Bulk Invite"
          iconType="bulkInvite"
          color={COLORS.lightBlue}
          isDisabled={isDisabled || !selectedUsersCount}
        />
      </Styled.ControlPanel>
    </CommonStylesForTables.InnerWrapper>
  );
};
