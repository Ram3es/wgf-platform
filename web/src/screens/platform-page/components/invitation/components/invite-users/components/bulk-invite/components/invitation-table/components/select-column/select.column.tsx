import { FormikProps } from 'formik';
import { useState } from 'react';
import styled from 'styled-components';

import { DropDown } from '@components/drop-down';
import { Icon } from '@components/icon';
import { COLORS } from '@styles/colors';

import { useAppSelector } from '@services/hooks/redux';

import { ROLES } from '@constants/user-roles';
import { typeOfInvitationForSuperAdmin } from '../../../../bulk-invite.constants';

import { IBulkInviteData } from '../../../../bulk-invite.typings';

import { InvitationTableCommonStyled as CommonStyled } from '../../../../bulk-invite.styles';
import { InvitationTableStyled as Styled } from '../../invitation-table.styles';

const TitleWrapper = styled.span`
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  flex: 1;
  margin: -10px -5px -10px -20px;
  padding: 10px 10px 10px 20px;

  svg {
    path {
      stroke: ${COLORS.grey};
    }
  }
`;

interface ISelectColumnProps {
  setInvitationList: React.Dispatch<
    React.SetStateAction<IBulkInviteData[] | null>
  >;
  existingTrainerGroups: IGroup[] | [];
  typeOfInvitation: string;
  group: string;
  id: string;
  handleUserActive: (id: string) => void;
  formikRef: React.RefObject<
    FormikProps<{
      users: IBulkInviteData[];
    }>
  >;
}

export const SelectColumn = (props: ISelectColumnProps) => {
  const {
    group,
    existingTrainerGroups,
    setInvitationList,
    typeOfInvitation,
    id,
    handleUserActive,
    formikRef,
  } = props;
  const { user } = useAppSelector((state) => state);
  const [isActiveDropdown, setIsActiveDropdown] = useState(false);

  const groupsOptions = existingTrainerGroups.map((group) => group.name);

  const openDropdown = () => {
    setTimeout(() => {
      handleUserActive(id);
    }, 0);

    setIsActiveDropdown(true);
  };

  const changeGroupUser = (id: string) => (groupName: string) => {
    setInvitationList((prev) =>
      prev!.map((user) =>
        user.id === id ? { ...user, group: groupName } : user
      )
    );

    formikRef.current?.values.users.forEach((item, index) => {
      if (item.id === id) {
        formikRef.current?.setFieldValue(`users.${index}.group`, groupName);
      }
    });
  };

  const changeTypeOfInvitation = (id: string) => (type: string) => {
    setInvitationList((prev) =>
      prev!.map((user) =>
        user.id === id
          ? { ...user, typeOfInvitation: type as TInvitationType }
          : user
      )
    );

    formikRef.current?.values.users.forEach((item, index) => {
      if (item.id === id) {
        formikRef.current?.setFieldValue(
          `users.${index}.typeOfInvitation`,
          type
        );
      }
    });
  };

  return user.role === ROLES.trainerAdmin ? (
    <CommonStyled.DataColumn>
      <TitleWrapper onClick={openDropdown}>
        {group}
        <Icon type="arrowBottom" />
      </TitleWrapper>
      {isActiveDropdown && (
        <Styled.SelectWrapper>
          <DropDown
            isFullWidth
            options={groupsOptions}
            selected={group}
            setSelected={changeGroupUser(id)}
            setIsActive={setIsActiveDropdown}
            handleUserActive={handleUserActive}
          />
        </Styled.SelectWrapper>
      )}
    </CommonStyled.DataColumn>
  ) : (
    <CommonStyled.DataColumn isCapitalized>
      <TitleWrapper onClick={openDropdown}>
        {typeOfInvitation} <Icon type="arrowBottom" />
      </TitleWrapper>
      {isActiveDropdown && (
        <Styled.SelectWrapper>
          <DropDown
            isFullWidth
            options={typeOfInvitationForSuperAdmin}
            selected={typeOfInvitation}
            setSelected={changeTypeOfInvitation(id)}
            setIsActive={setIsActiveDropdown}
            handleUserActive={handleUserActive}
          />
        </Styled.SelectWrapper>
      )}
    </CommonStyled.DataColumn>
  );
};
