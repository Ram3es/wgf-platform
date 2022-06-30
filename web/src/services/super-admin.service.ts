import { ENDPOINTS } from '@constants/api';
import { POST } from './api';

export const inviteUser = (body: IInvitationReq) =>
  POST<IInvitation, IInvitationReq>(
    `${ENDPOINTS.invitation}/invite-user`,
    body
  );

export const inviteTrainer = (body: IInvitationReq) =>
  POST<IInvitation, IInvitationReq>(
    `${ENDPOINTS.invitation}/invite-trainer`,
    body
  );

export const getAllUsers = () =>
  POST<IUserExistingAndInvited[]>(`${ENDPOINTS.user}/get-all-users`);

export const getAllUsersCsv = () =>
  POST<{ file: string }>(`${ENDPOINTS.user}/get-all-users-csv`);
