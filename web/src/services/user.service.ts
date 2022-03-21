import { ENDPOINTS } from '@constants/api';
import { POST, UPDATE } from '@services/api';

export const signUp = (data: IUserSignUp) =>
  POST<ISignUpResponse, IUserSignUp>(`${ENDPOINTS.user}/sign-up`, data);

export const facebookAuth = (data: IFacebookAuth) =>
  POST<ISignUpResponse, IFacebookAuth>(`${ENDPOINTS.facebook}/auth`, data);

export const googleAuth = (data: { token: string }) =>
  POST<ISignUpResponse, { token: string }>(`${ENDPOINTS.google}/auth`, data);

export const getUserByToken = () =>
  POST<IUser>(`${ENDPOINTS.user}/get-user-by-token`);

export const logOut = () =>
  UPDATE<{ message: string }>(`${ENDPOINTS.user}/logout`);

export const signIn = (data: ISignInData) =>
  POST<ISignUpResponse, ISignInData>(`${ENDPOINTS.user}/sign-in`, data);

export const resetPassword = (data: { email: string }) =>
  POST<{ message: string }, { email: string }>(
    `${ENDPOINTS.user}/reset-password-request`,
    data
  );

export const updateResetedPassword = (data: IUpdateResetedPassword) =>
  POST<ISignUpResponse, IUpdateResetedPassword>(
    `${ENDPOINTS.user}/update-reseted-password`,
    data
  );

export const updateProfilePassword = (data: IUpdateProfilePassword) =>
  POST<{ message: string }, IUpdateProfilePassword>(
    `${ENDPOINTS.user}/update-profile-password`,
    data
  );

export const updateUser = (data: IUserUpdate) =>
  UPDATE<IUser, IUserUpdate>(`${ENDPOINTS.user}/update`, data);

export const sendEmailVerification = (body: {
  email: string;
  userName: string;
}) =>
  POST<{ message: string }, { email: string; userName: string }>(
    `${ENDPOINTS.verification}/send-code`,
    body
  );

export const verifyCode = (body: { codeToSend: number; newEmail: string }) =>
  POST<{ message: string }, { codeToSend: number; newEmail: string }>(
    `${ENDPOINTS.verification}/verify-code`,
    body
  );

export const getUserHasPassword = () =>
  POST<{ password: boolean }>(`${ENDPOINTS.user}/has-password`);
