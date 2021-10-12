export interface IProfileInitialState {
  user: IUser | null;
  profileData: IProfileData | null;
  initialProfileData: IProfileData | null;
  accountData: IAccountData;
  isPhotoPicked: boolean;
  isProfileEdit: boolean;
  isAccountEdit: boolean;
}
