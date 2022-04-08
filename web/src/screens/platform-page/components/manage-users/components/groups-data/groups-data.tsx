import { FC, useState } from 'react';

import { Icon } from '@components/icon';

import { useAppSelector } from '@services/hooks/redux';

import { ROLES } from '@constants/user-roles';

import { GroupsDataStyles as Styled } from './groups-data.styles';

export const GroupsData: FC<{
  groups: IGroupForUser[];
  allUsers: IUserExistingAndInvited[];
}> = ({ groups, allUsers }) => {
  const { user } = useAppSelector((state) => state);
  const [showGroups, setShowGroups] = useState(false);
  const toggleShowModal = () => {
    setShowGroups((prev) => !prev);
  };

  return (
    <Styled.GroupDataColumnWrapper>
      {!groups.length && '-'}
      {groups.length === 1 &&
        user.role === ROLES.trainerAdmin &&
        groups[0].name}
      {groups.length === 1 &&
        user.role === ROLES.superAdmin &&
        `${groups[0].name} (${groups[0].trainerName})`}
      {groups.length > 1 && (
        <Styled.GroupsDiv onClick={toggleShowModal}>
          {groups[0].name} ({groups[0].trainerName})
          <Icon type="arrowDown" />
          {showGroups && (
            <Styled.GroupsModal>
              {groups.map((group) => {
                return (
                  <Styled.GroupText key={group.trainerName}>
                    {group.name} ({group.trainerName})
                  </Styled.GroupText>
                );
              })}
            </Styled.GroupsModal>
          )}
        </Styled.GroupsDiv>
      )}
    </Styled.GroupDataColumnWrapper>
  );
};
