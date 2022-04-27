import { ENDPOINTS } from '@constants/api';
import { POST } from './api';

export const getGroupsByTrainer = (body: { trainerId: string }) =>
  POST<IGroup[], { trainerId: string }>(
    `${ENDPOINTS.group}/get-groups-by-trainer`,
    body
  );

export const inviteStudent = (body: IInvitationReq) =>
  POST<IInvitation, IInvitationReq>(
    `${ENDPOINTS.invitation}/invite-student-from-trainer`,
    body
  );

export const getUsersByTrainer = (body: { trainerId: string }) =>
  POST<IUserExistingAndInvited[], { trainerId: string }>(
    `${ENDPOINTS.user}/get-users-by-trainer`,
    body
  );

export const getAllStudentsByTrainerCsv = (body: { trainerId: string }) =>
  POST<{ file: string }>(`${ENDPOINTS.user}/get-all-students-by-trainer-csv`);

export const authGameAdmin = () =>
  POST<IAuthGameAdmin>(`${ENDPOINTS.game}/auth-admin`);
