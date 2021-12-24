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

export interface IDataColumnPropsStyles {
  isBigBox?: boolean;
  isEditable?: boolean;
  isCapitalized?: boolean;
}

export interface IDataRowPropsStyles {
  error?: string;
  isActive?: boolean;
  isSelected?: boolean;
}
