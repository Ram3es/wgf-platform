import { ENDPOINTS } from '@constants/api';
import { POST } from './api';

export const getTrainersByUser = () =>
  POST<ITrainer[]>(`${ENDPOINTS.user}/get-trainers-by-user`);

export const disconnectTrainer = (data: IStudentFromTrainer) =>
  POST<{ message: string }, IStudentFromTrainer>(
    `${ENDPOINTS.group}/remove-user-from-trainer`,
    data
  );

export const requestTrainer = (data: IInvitationReq) =>
  POST<IInvitation, IInvitationReq>(
    `${ENDPOINTS.invitation}/request-trainer-from-student`,
    data
  );
