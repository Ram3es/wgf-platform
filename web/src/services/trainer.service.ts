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
