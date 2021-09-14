import { ENDPOINTS } from '@constants/api';
import { POST, UPDATE } from '@services/api';

export const signUp = (data: IUserSignUp) =>
  POST<ISignUpResponse, IUserSignUp>(`${ENDPOINTS.user}/sign-up`, data);

export const signIn = (data: ILoginData) =>
  POST<ISignUpResponse, ILoginData>(`${ENDPOINTS.user}/sign-in`, data);

export const updateUser = (data: IUserUpdate) =>
  UPDATE<IUser, IUserUpdate>(`${ENDPOINTS.user}/update`, data);
