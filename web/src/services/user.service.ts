import { ENDPOINTS } from '@constants/api';
import { DELETE, GET, POST, UPDATE } from '@services/api';

export const createUser = (data: IUserCreate) =>
  POST<IPostResponce, IUserCreate>(ENDPOINTS.user, data);

export const getUser = (id: string) => GET<IUser>(`${ENDPOINTS.user}/${id}`);

export const getPdf = (id: string) =>
  GET<{ file: string }>(`${ENDPOINTS.user}${ENDPOINTS.pdf}/${id}`);

export const deleteUser = (id: string) =>
  DELETE<IUser>(`${ENDPOINTS.user}/${id}`);

export const updateUser = (id: string, data: IUserUpdate) =>
  UPDATE<IUser, IUserUpdate>(`${ENDPOINTS.user}/${id}`, data);
