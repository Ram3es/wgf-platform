export const ERRORS = {
  invalidToken: 'Invalid token',
  invalidRole: 'Invalid role',
  tokenError: 'Token error',
  linkExpired: 'Link expired',
  tokenExpired: 'Token expired',
  alreadyExist: 'Already exist',
  notExist: 'Not exist',
  notFound: 'Not found',
  user: {
    notExist: 'Sorry pls check the data as this user doesn’t exist.',
    loginError: 'Wrong email or/and password',
    wrongPassword: "Looks like that's the wrong password. Try again or reset.",
    alreadyExist: 'This user already exists',
    anotherRole: 'This user already has another role, not a student.',
  },
  student: {
    trainerNotExist: 'Sorry pls check the email as this user doesn’t exist.',
    alreadySent: 'You have already sent a request to this trainer today.',
    alreadyExist: 'This trainer has already been added to you.',
  },
  trainer: {
    studentNotExist: 'Sorry pls check the email as this student doesn’t exist.',
    alreadySent: 'You have already sent a request to this student today.',
    alreadyExist: 'This student has already been added to you.',
  },
};
