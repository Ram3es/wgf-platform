import { ENDPOINTS } from '@constants/api';
import { POST, UPDATE } from '@services/api';

export const signUp = (data: IUserSignUp) =>
  POST<ISignUpResponse, IUserSignUp>(`${ENDPOINTS.user}/sign-up`, data);

export const logOut = () =>
  UPDATE<{ message: string }>(`${ENDPOINTS.user}/logout`);

export const signIn = (data: ISignInData) =>
  POST<ISignUpResponse, ISignInData>(`${ENDPOINTS.user}/sign-in`, data);

export const resetPassword = (data: { email: string }) =>
  POST<{ message: string }, { email: string }>(
    `${ENDPOINTS.user}/reset-password-request`,
    data
  );

export const updateResetedPassword = (data: IUpdatePassword) =>
  POST<{ message: string }, IUpdatePassword>(
    `${ENDPOINTS.user}/update-reseted-password`,
    data
  );

export const updateUser = (data: IUserUpdate) =>
  UPDATE<IUser, IUserUpdate>(`${ENDPOINTS.user}/update`, data);
