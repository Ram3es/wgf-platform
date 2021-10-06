export const INVITATION_ROUTES = {
  main: 'invitation',
  acceptInvitationTrainerToExistingStudent:
    'accept-invitation-trainer-to-existing-student/:token',
  acceptInvitationTrainerToStudent:
    'accept-invitation-trainer-to-student/:token',
  inviteStudentFromTrainer: 'invite-student-from-trainer',
  requestTrainerFromStudent: 'request-trainer-from-student',
  inviteTrainer: 'invite-trainer',
  getInvitations: 'get-invitations',
  deleteInvitation: 'delete-invitation',
  acceptInvitationExistingTrainer: 'accept-invitation-existing-trainer/:token',
  acceptInvitationNotExistUser: 'accept-invitation-not-exist-user/:token',
  acceptRequestTrainer: 'accept-request-trainer/:token',
  inviteUser: 'invite-user',
  approveAllTrainerRequests: 'approve-all-trainer-requests',
};

export enum INVITATION_STATUS {
  pending = 'Pending',
  accepted = 'Accepted',
  registrationPending = 'Registration Pending',
}

export enum INVITATION_TYPE {
  user = 'user',
  student = 'student',
  trainer = 'trainer',
  requestTrainer = 'requestTrainer',
}
