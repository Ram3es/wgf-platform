import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: IUser = {
  id: '',
  isSubscriber: false,
  role: 'user',
  jobStatus: '',
  avatar: '',
  country: '',
  firstName: '',
  lastName: '',
  email: '',
  created: '',
  mobileNumber: '',
  organizationName: '',
  occupation: '',
};

const usersSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    clearUser: () => initialState,
    loginUser: (_, action: PayloadAction<IUser>) => action.payload,
    updateUserAvatar: (state, action: PayloadAction<{ avatar: string }>) => {
      state.avatar = action.payload.avatar;
    },
    updateUserProfile: (state, action: PayloadAction<IProfileData>) => {
      state.country = action.payload.country;
      state.email = action.payload.email;
      state.firstName = action.payload.firstName;
      state.lastName = action.payload.lastName;
      state.mobileNumber = action.payload.mobileNumber;
      state.occupation = action.payload.occupation;
      state.organizationName = action.payload.organizationName;
    },
    updateUserJobStatus: (
      state,
      action: PayloadAction<{ jobStatus: string }>
    ) => {
      state.jobStatus = action.payload.jobStatus;
    },
    updateUserSubscribing: (
      state,
      action: PayloadAction<{ isSubscriber: boolean }>
    ) => {
      state.isSubscriber = action.payload.isSubscriber;
    },
  },
});

export const {
  clearUser,
  loginUser,
  updateUserAvatar,
  updateUserProfile,
  updateUserJobStatus,
  updateUserSubscribing,
} = usersSlice.actions;

export default usersSlice.reducer;
