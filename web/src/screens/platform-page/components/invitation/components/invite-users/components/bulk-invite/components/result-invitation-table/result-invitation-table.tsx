import { useAppSelector } from '@services/hooks/redux';

import { ROLES } from '@constants/user-roles';

import { IBulkInviteData } from '../../bulk-invite.typings';

import { InvitationTableCommonStyled as CommonStyled } from '../../bulk-invite.styles';

export const ResultInvitationTable = (props: {
  invitationList: IBulkInviteData[];
}) => {
  const { user } = useAppSelector((state) => state);

  return (
    <CommonStyled.Wrapper>
      <CommonStyled.TableWrapper>
        <CommonStyled.Table>
          <CommonStyled.HeaderRow>
            <CommonStyled.HeaderColumn>invite status</CommonStyled.HeaderColumn>
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
            {props.invitationList.map(
              ({ id, name, email, typeOfInvitation, error, group }) => (
                <CommonStyled.DataRow key={id} error={error}>
                  <CommonStyled.DataColumn>
                    {error || 'Sent'}
                  </CommonStyled.DataColumn>
                  <CommonStyled.DataColumn>{name}</CommonStyled.DataColumn>
                  <CommonStyled.DataColumn isBigBox>
                    {email}
                  </CommonStyled.DataColumn>
                  {user.role === ROLES.trainerAdmin ? (
                    <CommonStyled.DataColumn>{group}</CommonStyled.DataColumn>
                  ) : (
                    <CommonStyled.DataColumn isCapitalized>
                      {typeOfInvitation}
                    </CommonStyled.DataColumn>
                  )}
                </CommonStyled.DataRow>
              )
            )}
          </CommonStyled.DataWrapper>
        </CommonStyled.Table>
      </CommonStyled.TableWrapper>
    </CommonStyled.Wrapper>
  );
};
