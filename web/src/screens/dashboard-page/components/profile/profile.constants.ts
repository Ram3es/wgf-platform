export const initialProfileData = {
  firstName: '',
  lastName: '',
  organizationName: '',
  occupation: '',
  created: '',
  email: '',
  mobileNumber: '',
  country: 'Choise Country',
};

export const initialAccountData = {
  password: '',
  newPassword: '',
  confirmPassword: '',
};

export const initialProfileState = {
  user: null,
  profileData: null,
  initialProfileData: null,
  accountData: initialAccountData,
  isPhotoPicked: false,
  isProfileEdit: false,
  isAccountEdit: false,
};
