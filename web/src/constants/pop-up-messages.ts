import Swal from 'sweetalert2';

import { ROUTES } from './routes';

export const UserErrorMessages = {
  '400': Swal.mixin({
    icon: 'error',
    title: 'Oops...',
    html: `<p>Wrong email or/and password</p>
    <a href="${ROUTES.resetPassword}">Forget Password?</a>`,
    footer: `<p>Not a member? <a href="${ROUTES.signUp}">Sign up now</a></p>`,
  }),
  '409': Swal.mixin({
    icon: 'error',
    title: 'Already Exist',
    text: `User with this email is already registered`,
    footer: `<p>Try to <a href="${ROUTES.signIn}">sign in</a></p>`,
  }),
  '404': Swal.mixin({
    icon: 'error',
    title: 'Not Exist...',
    text: 'There is no user with this email.',
    footer: `<p>Not a member? <a href="${ROUTES.signUp}">Sign up now</a></p>`,
  }),
};

export const errorMessage = (text: string) =>
  Swal.mixin({
    icon: 'error',
    title: 'Oops...',
    text,
  });

export const unAutorizedError = () =>
  Swal.mixin({
    icon: 'error',
    title: 'Unautorized...',
    text: 'The session has been expired. Please, login.',
  });

export const imageError = () =>
  Swal.mixin({
    icon: 'error',
    title: 'Bad file format...',
    text: 'Please, choose another image.',
  });

export const downloadMessage = (
  file: string,
  fileName: string,
  html?: string
) =>
  Swal.mixin({
    icon: 'question',
    html: `
    ${html || ''}
    <p>Do you want to download file?</p>
    `,
    footer: `<a href="${file}" download="${fileName}">Download</a>`,
    showConfirmButton: false,
    showCloseButton: true,
  });
