import { ENDPOINTS } from '@constants/api';
import { POST } from '@services/api';

export const getInvitations = (body: { id: string }) =>
  POST<IInvitation[], { id: string }>(
    `${ENDPOINTS.invitation}/get-invitations`,
    body
  );
