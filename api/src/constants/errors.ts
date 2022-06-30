export const ERRORS = {
  invalidToken: 'Invalid token',
  invalidRole: 'Invalid role',
  tokenError: 'Token error',
  linkExpired: 'Link expired',
  tokenExpired: 'Token expired',
  alreadyExist: 'Already exist',
  notExist: 'Not exist',
  notFound: 'Not found',
  emailUsed: 'Sorry this email already exists',
  wrongCode: 'The code is wrong',
  codeExpired: 'Code expired',
  user: {
    notExist: 'Sorry pls check the data as this user doesn’t exist.',
    loginError: 'Wrong email or/and password',
    wrongPassword: "Looks like that's the wrong password. Try again or reset.",
    loggedInBySocials:
      "You have signed up using socials and don't have any password, please reset your password on sign in page",
    alreadyExist: 'This user already exists',
    anotherRole: 'This user already has another role, not a student.',
  },
  superAdmin: {
    alreadyExistsTrainer: 'This trainer already exists',
  },
  student: {
    trainerNotExist: 'That user is not with trainer role.',
    alreadyExist: 'This trainer has already been added to you.',
  },
  trainer: {
    studentNotExist: 'Sorry pls check the email as this student doesn’t exist.',
    alreadyExist: 'This student has already been added to you.',
  },
  bulkInvite: 'Bulk Invite Error',
  pdf: 'Error download, try again',
  alreadySentInvite:
    "You've already sent a request to this user within 24 hours.",
} as const;
