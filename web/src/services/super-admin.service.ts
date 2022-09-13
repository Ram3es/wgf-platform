import { IUserIdProps } from './../screens/platform-page/components/edit-page/delete-page/delete-page';
import { ENDPOINTS } from '@constants/api';
import { IEditUserProps } from '@screens/platform-page/components/edit-page/edit-table-info';
import { POST, GET, UPDATE } from './api';
import { IUpdateRole } from './service-types/service-types';

export const inviteUser = (body: IInvitationReq) =>
  POST<IInvitation, IInvitationReq>(
    `${ENDPOINTS.invitation}/invite-user`,
    body
  );

export const inviteTrainer = (body: IInvitationReq) =>
  POST<IUserExistingAndInvited, IInvitationReq>(
    `${ENDPOINTS.invitation}/invite-trainer`,
    body
  );

export const getAllUsers = () =>
  POST<IUserExistingAndInvited[]>(
    `${ENDPOINTS.user}/get-all-users`,
    undefined,
    50000
  );

export const getAllUsersCsv = () =>
  POST<{ file: string }>(`${ENDPOINTS.user}/get-all-users-csv`);

export const getAllTrainers = () =>
  POST<IUserExistingAndInvited[]>(`${ENDPOINTS.user}/get-all-trainers`);

export const getAllTrainersCsv = () =>
  GET<{ file: string }>(`${ENDPOINTS.user}/get-all-trainers-csv`);

export const getUserById = (body: { userId: string }) =>
  POST<IEditUserProps, { userId: string }>(
    `${ENDPOINTS.user}/get-user-by-id`,
    body
  );

export const deleteUserById = (body: IUserIdProps) => {
  return POST<{}, IUserIdProps>(`${ENDPOINTS.user}/delete-user`, body);
};
export const getUserByEmail = (email: string) =>
  GET<IUserExistingAndInvited>(`${ENDPOINTS.user}/get-user-by-email/${email}`);

export const changeRole = (body: IUpdateRole) =>
  UPDATE<{ status: 'Success' }, IUpdateRole>(
    `${ENDPOINTS.user}/change-role`,
    body
  );
