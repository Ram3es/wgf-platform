export interface IBulkInviteData {
  name: string;
  email: string;
  id: string;
  typeOfInvitation: TInvitationType;
  isSelected: boolean;
  error?: string;
  group?: string;
  isEditable?: boolean;
}
