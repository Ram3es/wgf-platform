import { FC, useState } from 'react';

import { Icon } from '@components/icon';

import { GroupsDataStyles as Styled } from './groups-data.styles';

export const GroupsData: FC<{
  groups: IGroupForUser[];
  allUsers: IUserExistingAndInvited[];
}> = ({ groups, allUsers }) => {
  const [showGroups, setShowGroups] = useState(false);
  const toggleShowModal = () => {
    setShowGroups((prev) => !prev);
  };

  return (
    <Styled.GroupDataColumnWrapper>
      {!groups.length && '-'}
      {groups.length === 1 && groups[0].name}
      {groups.length > 1 && (
        <Styled.GroupsDiv onClick={toggleShowModal}>
          {groups[0].name} ({groups[0].trainerName})
          <Icon type="arrowDown" />
          {showGroups && (
            <Styled.GroupsModal>
              {groups.map((group) => {
                const trainer = allUsers.find(
                  (user) => user.id === group.trainerId
                );
                const trainerName = `${trainer?.firstName} ${trainer?.lastName}`;
                return (
                  <Styled.GroupText key={group.name}>
                    {group.name} ({trainerName})
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
