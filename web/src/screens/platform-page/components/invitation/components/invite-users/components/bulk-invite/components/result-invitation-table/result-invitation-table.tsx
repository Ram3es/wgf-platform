import { useAppSelector } from '@services/hooks/redux';

import { ROLES } from '@constants/user-roles';

import { IBulkInviteData } from '../../bulk-invite.typings';

import { CommonStylesForTables } from '@screens/platform-page/platform-page.styles';

export const ResultInvitationTable = (props: {
  invitationList: IBulkInviteData[];
}) => {
  const { user } = useAppSelector((state) => state);

  return (
    <CommonStylesForTables.InnerWrapper>
      <CommonStylesForTables.InnerTableWrapper>
        <CommonStylesForTables.Table>
          <CommonStylesForTables.HeaderRow>
            <CommonStylesForTables.HeaderColumn>
              invite status
            </CommonStylesForTables.HeaderColumn>
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
            {props.invitationList.map(
              ({ id, name, email, typeOfInvitation, error, group }) => (
                <CommonStylesForTables.DataRow
                  key={id}
                  error={error}
                  isResultsTable
                >
                  <CommonStylesForTables.DataColumn
                    isErrorColumn
                    isError={!!error}
                  >
                    {error || 'Sent'}
                  </CommonStylesForTables.DataColumn>
                  <CommonStylesForTables.DataColumn>
                    {name}
                  </CommonStylesForTables.DataColumn>
                  <CommonStylesForTables.DataColumn isBigBox>
                    {email}
                  </CommonStylesForTables.DataColumn>
                  {user.role === ROLES.trainerAdmin ? (
                    <CommonStylesForTables.DataColumn>
                      {group}
                    </CommonStylesForTables.DataColumn>
                  ) : (
                    <CommonStylesForTables.DataColumn isCapitalized>
                      {typeOfInvitation}
                    </CommonStylesForTables.DataColumn>
                  )}
                </CommonStylesForTables.DataRow>
              )
            )}
          </CommonStylesForTables.DataWrapper>
        </CommonStylesForTables.Table>
      </CommonStylesForTables.InnerTableWrapper>
    </CommonStylesForTables.InnerWrapper>
  );
};
