import Swal from 'sweetalert2';

import { COLORS } from '@styles/colors';
import { ROUTES } from './routes';

export const UserErrorMessages = {
  '400': Swal.mixin({
    icon: 'error',
    title: 'Oops...',
    html: `<p>Wrong email or/and password</p>
    <a href="${ROUTES.resetPassword}">Forget Password?</a>`,
    footer: `<p>Not a member? <a href="${ROUTES.signUp}">Sign up now</a></p>`,
    confirmButtonColor: `${COLORS.lightBlue}`,
  }),
  '409': Swal.mixin({
    icon: 'error',
    title: 'Already Exist',
    text: `User with this email is already registered`,
    footer: `<p>Try to <a href="${ROUTES.signIn}">sign in</a></p>`,
    confirmButtonColor: `${COLORS.lightBlue}`,
  }),
  '404': Swal.mixin({
    icon: 'error',
    title: 'Not Exist...',
    text: 'Sorry pls check the email as this user doesn’t exist.',
    footer: `<p>Not a member? <a href="${ROUTES.signUp}">Sign up now</a></p>`,
    confirmButtonColor: `${COLORS.lightBlue}`,
  }),
};

export const trainerRequestErrorMessage = (text: string) =>
  Swal.mixin({
    icon: 'error',
    title: 'Trainer Request Failed',
    text,
    confirmButtonColor: `${COLORS.lightBlue}`,
  });

export const trainerRequestSuccessMessage = Swal.mixin({
  icon: 'success',
  title: 'Trainer Request Sent',
  text: `Your request has been sent to the trainer.`,
  confirmButtonColor: `${COLORS.lightBlue}`,
});

export const studentInviteSuccessMessage = Swal.mixin({
  icon: 'success',
  title: 'Invitation Student Sent',
  text: `Your invitation has been sent to the student.`,
  confirmButtonColor: `${COLORS.lightBlue}`,
});

export const userInviteSuccessMessage = Swal.mixin({
  icon: 'success',
  title: 'Invitation User Sent',
  text: `Your invitation has been sent to the user.`,
  confirmButtonColor: `${COLORS.lightBlue}`,
});

export const trainerInviteSuccessMessage = Swal.mixin({
  icon: 'success',
  title: 'Invitation Trainer Sent',
  text: `Your invitation has been sent to the trainer.`,
  confirmButtonColor: `${COLORS.lightBlue}`,
});

export const errorMessage = (text: string) =>
  Swal.mixin({
    icon: 'error',
    title: 'Oops...',
    text,
    confirmButtonColor: `${COLORS.lightBlue}`,
  });

export const unAutorizedError = () =>
  Swal.mixin({
    icon: 'error',
    title: 'Unautorized...',
    text: 'The session has been expired. Please, login.',
    confirmButtonColor: `${COLORS.lightBlue}`,
  });

export const imageError = () =>
  Swal.mixin({
    icon: 'error',
    title: 'Incorrect file format...',
    text: 'Please, choose another image.',
    confirmButtonColor: `${COLORS.lightBlue}`,
  });

export const fileError = {
  format: Swal.mixin({
    icon: 'error',
    title: 'Incorrect file format...',
    text: 'Please, choose another file with CSV format.',
    confirmButtonColor: `${COLORS.lightBlue}`,
  }),
  data: Swal.mixin({
    icon: 'error',
    title: 'Incorrect file...',
    text: `Incorrect data in the CSV file. 
    Please download the sample file and follow the format specified in it.`,
    confirmButtonColor: `${COLORS.lightBlue}`,
  }),
};

export const downloadMessage = (
  file: string,
  fileName: string,
  html?: string
) =>
  Swal.mixin({
    icon: 'question',
    html: `
    ${html || ''}
    <p>Do you want to download the file?</p>
    `,
    footer: `<a href="${file}" download="${fileName}">Download</a>`,
    showConfirmButton: false,
    showCloseButton: true,
  });
