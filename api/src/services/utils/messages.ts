import { env } from 'process';

import { UserEntity } from 'src/user/entities/user.entity';

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
  from: `Avid Adventures <${env.EMAIL_ADRESS_FROM}>`,

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
  from: `Avid Adventures <${env.EMAIL_ADRESS_FROM}>`,

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
  from: `Avid Adventures <${env.EMAIL_ADRESS_FROM}>`,

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
