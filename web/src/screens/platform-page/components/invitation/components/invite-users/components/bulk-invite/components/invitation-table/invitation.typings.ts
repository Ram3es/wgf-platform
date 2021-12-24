import { IBulkInviteData } from '../../bulk-invite.typings';

export interface IInvitationTableProps {
  invitationList: IBulkInviteData[];
  setInvitationList: React.Dispatch<
    React.SetStateAction<IBulkInviteData[] | null>
  >;
  groups: IGroup[] | [];
  onSubmit: () => void;
  handleCloseTable: () => void;
}
