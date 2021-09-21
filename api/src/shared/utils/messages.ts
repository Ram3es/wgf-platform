import { config } from 'src/constants/config';
import { UserEntity } from 'src/user/entities/user.entity';

const WEB_BASE_URL = config().urls.webUrl;
const EMAIL_FROM = config().transport.transport.auth.user;
const API_BASE_URL = config().urls.apiUrl;

export interface IMessage {
  from: string;
  to: string;
  bcc: string;
  subject: string;
  html: string;
  attachments?: {
    [key: string]: string;
  }[];
}

export const caasQuizResultMessage = (
  user: UserEntity,
  pdf: string
): IMessage => ({
  from: `Avid Adventures <${EMAIL_FROM}>`,

  to: `${user.firstName} ${user.lastName}<${user.email}>`,
  bcc: user.email,

  subject: 'Quiz Completion',

  html: `
    <p>Hi <b>${user.firstName},</b></p>
    <p>Thanks for completing The Career Adapt-Abilities Assessment.</p>
    <p>You’re all set! Please refer to the attachment to view your results.</p>
    <p>Bests,<br/>Jac at Avid Adventures</p>
  `,

  attachments: [
    {
      filename: `${user.firstName}-caas-quiz-results.pdf`,
      content: pdf,
      encoding: 'base64',
    },
  ],
});

export const caasCooperationQuizResultMessage = (
  user: UserEntity,
  pdf: string
): IMessage => ({
  from: `Avid Adventures <${EMAIL_FROM}>`,

  to: `${user.firstName} ${user.lastName}<${user.email}>`,
  bcc: user.email,

  subject: 'Quiz Completion',

  html: `
    <p>Hi <b>${user.firstName},</b></p>
    <p>Thanks for completing The Career Adapt-Abilities + Cooperation Assessment.</p>
    <p>You’re all set! Please refer to the attachment to view your results.</p>
    <p>Bests,<br/>Jac at Avid Adventures</p>
  `,

  attachments: [
    {
      filename: `${user.firstName}-caas-quiz-results.pdf`,
      content: pdf,
      encoding: 'base64',
    },
  ],
});

export const ccQuizResultMessage = (
  user: UserEntity,
  pdf: string
): IMessage => ({
  from: `Avid Adventures <${EMAIL_FROM}>`,

  to: `${user.firstName} ${user.lastName}<${user.email}>`,
  bcc: user.email,

  subject: 'Quiz Completion',

  html: `
    <p>Hi <b>${user.firstName},</b></p>
    <p>Thanks for completing The Career Canvas</p>
    <p>You’re all set! Please refer to the attachment to view your results.</p>
    <p>Bests,<br/>Jac at Avid Adventures</p>
  `,

  attachments: [
    {
      filename: `${user.firstName}-cc-quiz-results.pdf`,
      content: pdf,
      encoding: 'base64',
    },
  ],
});

export const quizMessage = {
  ['caas-quiz']: caasQuizResultMessage,
  ['caas-cooperation-quiz']: caasCooperationQuizResultMessage,
  ['career-canvas']: ccQuizResultMessage,
};

export const registrationMessage = (user: UserEntity): IMessage => ({
  from: `Avid Adventures <${EMAIL_FROM}>`,

  to: `${user.firstName} ${user.lastName}<${user.email}>`,
  bcc: user.email,

  subject: 'Registration',

  html: `
    <p>Hi <b>${user.firstName},</b></p>
    <p>You have successfully registered with Avid Adventures.</p>
    <p>Here are your account details:</p>
    <p>First Name: ${user.firstName}</p>
    <p>Last Name: ${user.lastName}</p>
    <p>Email: ${user.email}</p>
    <p>Password: ${user.password}</p>
    <p>Please log in and complete your assessments <a href=${WEB_BASE_URL}sign-in>here</a> to get your results.</p>
    <p>Bests,<br/>Jac at Avid Adventures</p>
  `,
});

export const createPasswordMail = (user: UserEntity, token: string) => ({
  from: `Avid Adventures <${EMAIL_FROM}>`,
  to: user.email,
  bcc: user.email,
  subject: 'Update password link',
  html: `
    <p>Hi <b>${user.firstName},</b></p>
    <p>We're sending you this email because you requested a password reset.</p>
    <p>Click  <a href=${API_BASE_URL}user/password/${token}>here </a> to reset your password on Avid Adventures.</p>
    <p>If you didn't request a password reset, you can ignore this email. Your password will not be changed.</p>
    <p>Bests,<br/>Jac at Avid Adventures</p>
  `,
});
