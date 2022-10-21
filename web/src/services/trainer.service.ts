import { ENDPOINTS } from '@constants/api';
import { POST } from './api';

export const getGroupsByTrainer = (body: { trainerId: string }) =>
  POST<IGroup[], { trainerId: string }>(
    `${ENDPOINTS.group}/get-groups-by-trainer`,
    body
  );

export const createGroup = (body: Partial<IGroup>) =>
  POST<IGroup, Partial<IGroup>>(`${ENDPOINTS.group}/create`, body);

export const renameTrainerGroup = (body: Partial<IGroup>) =>
  POST<IGroup, Partial<IGroup>>(`${ENDPOINTS.group}/rename`, body);

export const deleteGroup = (body: { groupId: string }) =>
  POST<IGroup, { groupId: string }>(`${ENDPOINTS.group}/delete-group`, body);

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

export const changeGroupForUser = (body: IChangeGroupBody) =>
  POST(`${ENDPOINTS.group}/change-group-for-users`, body);

export const getAllStudentsByTrainerCsv = (body: { trainerId: string }) =>
  POST<{ file: string }>(`${ENDPOINTS.user}/get-all-students-by-trainer-csv`);

export const authGameAdmin = () =>
  POST<IAuthGameAdmin>(`${ENDPOINTS.game}/auth-admin`);
