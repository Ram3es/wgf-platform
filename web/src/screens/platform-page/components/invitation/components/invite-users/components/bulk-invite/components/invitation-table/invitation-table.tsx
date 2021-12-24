import { Formik } from 'formik';
import { ChangeEvent, useEffect } from 'react';

import { Button } from '@components/button';
import { Checkbox } from '@components/checkbox';
import { Icon } from '@components/icon';
import { Input } from '@components/text-field/components/input';
import { COLORS } from '@styles/colors';
import { SelectColumn } from './components/select-column';

import { useInvitationTableState } from './invitation-table.state';

import { ROLES } from '@constants/user-roles';
import { InvitationTableFormSchema } from './invitation-table.constants';

import { IInvitationTableProps } from './invitation.typings';

import { InvitationTableCommonStyled as CommonStyled } from '../../bulk-invite.styles';
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
    handleUserChange,
    selectedUsersCount,
    formikRef,
    setIsDisabled,
    isDisabled,
    groups,
    setInvitationList,
    onSubmit,
    tableRef,
    isActiveUser,
    handleUserActive,
    handleCloseTable,
  } = useInvitationTableState(props);

  return (
    <CommonStyled.Wrapper>
      <Styled.CheckboxWrapper>
        <Checkbox
          isMonoColor
          label="Select all"
          onChange={onSelectAll}
          isChecked={isSelectedAll}
          boxWidth={16}
          boxHeight={16}
          alignItems="center"
        />
      </Styled.CheckboxWrapper>
      <CommonStyled.TableWrapper ref={tableRef}>
        <CommonStyled.Table>
          <CommonStyled.HeaderRow>
            <Styled.ControlColumn />
            <Styled.ControlColumn>Edit</Styled.ControlColumn>
            <Styled.ControlColumn>Remove User</Styled.ControlColumn>
            <CommonStyled.HeaderColumn>name</CommonStyled.HeaderColumn>
            <CommonStyled.HeaderColumn isBigBox>
              email
            </CommonStyled.HeaderColumn>
            <CommonStyled.HeaderColumn>
              {user.role === ROLES.trainerAdmin
                ? 'group name'
                : 'type of invitation'}
            </CommonStyled.HeaderColumn>
          </CommonStyled.HeaderRow>
          <CommonStyled.DataWrapper>
            {invitationList.map(
              ({
                id,
                name,
                email,
                group,
                typeOfInvitation,
                isSelected,
                isEditable,
              }) => (
                <CommonStyled.DataRow
                  key={id}
                  isActive={isActiveUser === id}
                  isSelected={isSelected}
                >
                  <Styled.ControlColumn>
                    <Checkbox
                      isMonoColor
                      label=""
                      onChange={onSelectUser(id)}
                      isChecked={isSelected}
                      boxWidth={16}
                      boxHeight={16}
                      alignItems="center"
                    />
                  </Styled.ControlColumn>
                  <Styled.ControlColumn>
                    <Styled.ControlWrapper onClick={onEditUser(id)}>
                      <Icon type="edit" />
                    </Styled.ControlWrapper>
                  </Styled.ControlColumn>
                  <Styled.ControlColumn>
                    <Styled.ControlWrapper onClick={onDeleteUser(id)}>
                      <Icon type="bin" />
                    </Styled.ControlWrapper>
                  </Styled.ControlColumn>
                  {isEditable ? (
                    <Formik
                      initialValues={{ name, email }}
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
                        isValid,
                      }) => {
                        useEffect(() => {
                          setIsDisabled(!isValid);
                        }, [isValid]);

                        const handleUserDataChange =
                          (id: string) =>
                          (event: ChangeEvent<HTMLInputElement>) => {
                            handleChange(event);
                            handleUserChange(id, event);
                          };
                        return (
                          <>
                            <CommonStyled.DataColumn isEditable={isEditable}>
                              <Input
                                type="text"
                                value={name}
                                onChange={handleUserDataChange(id)}
                                name="name"
                                withBorder
                                height="32px"
                                error={
                                  touched.name && errors.name ? errors.name : ''
                                }
                                onBlur={handleBlur}
                              />
                            </CommonStyled.DataColumn>
                            <CommonStyled.DataColumn
                              isBigBox
                              isEditable={isEditable}
                            >
                              <Input
                                type="text"
                                value={email}
                                onChange={handleUserDataChange(id)}
                                name="email"
                                withBorder
                                height="32px"
                                error={
                                  touched.email && errors.email
                                    ? errors.email
                                    : ''
                                }
                                onBlur={handleBlur}
                              />
                            </CommonStyled.DataColumn>
                          </>
                        );
                      }}
                    </Formik>
                  ) : (
                    <>
                      <CommonStyled.DataColumn isEditable={isEditable}>
                        {name}
                      </CommonStyled.DataColumn>
                      <CommonStyled.DataColumn isBigBox isEditable={isEditable}>
                        {email}
                      </CommonStyled.DataColumn>
                    </>
                  )}
                  <SelectColumn
                    existingTrainerGroups={groups}
                    group={group || ''}
                    setInvitationList={setInvitationList}
                    typeOfInvitation={typeOfInvitation}
                    id={id}
                    handleUserActive={handleUserActive}
                  />
                </CommonStyled.DataRow>
              )
            )}
          </CommonStyled.DataWrapper>
        </CommonStyled.Table>
      </CommonStyled.TableWrapper>
      <Styled.SelectedUsersCount>
        {selectedUsersCount} selected
      </Styled.SelectedUsersCount>
      <Styled.ControlPanel>
        <Button
          title="Return"
          onClick={handleCloseTable}
          color={COLORS.lightBlue}
          iconType="back"
        />
        <Button
          type="submit"
          onClick={formikRef.current?.handleSubmit || onSubmit}
          title="Bulk Invite"
          iconType="bulkInvite"
          color={COLORS.lightBlue}
          isDisabled={isDisabled || !selectedUsersCount}
        />
      </Styled.ControlPanel>
    </CommonStyled.Wrapper>
  );
};
