export interface IProfileInitialState {
  profileData: IProfileData | null;
  initialProfileData: IProfileData | null;
  accountData: IAccountData;
  isPhotoPicked: boolean;
  isProfileEdit: boolean;
  isAccountEdit: boolean;
  avatar: null | string;
}
