import Swal from 'sweetalert2';

export const UserErrorMessages = {
  '400': Swal.mixin({
    icon: 'error',
    title: 'Oops...',
    html: `<p>Wrong email or/and password</p>
    <a href="/forget-password">Forget Password?</a>`,
    footer: `<p>Not a member? <a href="/sign-up">Sign up now</a></p>`,
  }),
  '409': Swal.mixin({
    icon: 'error',
    title: 'Already Exist',
    text: `User with this email is already registered`,
    footer: `<p>Try to <a href="/sign-in">sign in</a></p>`,
  }),
  '404': Swal.mixin({
    icon: 'error',
    title: 'Not Exist...',
    text: 'There is no user with this email.',
    footer: `<p>Not a member? <a href="/sign-up">Sign up now</a></p>`,
  }),
};

export const errorMessage = (text: string) =>
  Swal.mixin({
    icon: 'error',
    title: 'Oops...',
    text,
  });

export const downloadMessage = (
  file: string,
  fileName: string,
  html?: string
) =>
  Swal.mixin({
    icon: 'question',
    html: `
    ${html}
    <p>Do you want to download file?</p>
    `,
    footer: `<a href="${file}" download="${fileName}">Download</a>`,
    showConfirmButton: false,
    showCloseButton: true,
  });
