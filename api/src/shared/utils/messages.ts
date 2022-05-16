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

  html: createEmailTemplateHtml(
    `<p style="font-weight: normal; margin: 0; margin-bottom: 15px; font-size: 16px; line-height: 25px;" class="mobile_paragraph">
      Thanks for competing the Career Flex quiz.
    </p>
    <p style="font-weight: normal; margin: 0; margin-bottom: 15px; font-size: 16px; line-height: 25px;" class="mobile_paragraph">
      You are all set! You can identify your career adaptability superpowers, and shows you how you could flex your career, bringing it to the next level!
    </p>
    <p style="font-weight: normal; margin: 0; margin-bottom: 15px; font-size: 16px; line-height: 25px;" class="mobile_paragraph">
      Please refer to the attachment to view your result or log in to your account.
    </p>`,
    user.firstName,
    `<th style="box-sizing: border-box;text-align: right; width: 50%">
    <img alt="T@" src="https://i.ibb.co/fXq9Zwv/career-flex.png" style="box-sizing: border-box; border: none; -ms-interpolation-mode: bicubic; max-width: 100%;">
    </th>`,
    `${WEB_BASE_URL}sign-in`,
    `Sign in`
  ),

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

  html: createEmailTemplateHtml(
    `
    <p>Thanks for completing The Career Canvas quiz</p>
    <p>You’re all set! Please refer to the attachment to view your result or log in to your account..</p>
  `,
    user.firstName,
    `<th style="box-sizing: border-box;text-align: right; width: 50%; padding: 10px 20px;">
    <img alt="T@" src="https://i.ibb.co/vcnCq0h/career-canvas.png" style="box-sizing: border-box; border: none; -ms-interpolation-mode: bicubic; max-width: 100%;">
    </th>`,
    `${WEB_BASE_URL}sign-in`,
    `Sign in`
  ),

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
  ['caas-cooperation-quiz']: caasQuizResultMessage,
  ['career-canvas']: ccQuizResultMessage,
};

export const registrationMessage = (user: UserEntity): IMessage => ({
  from: `Avid Adventures <${EMAIL_FROM}>`,

  to: `${user.firstName} ${user.lastName}<${user.email}>`,
  bcc: user.email,

  subject: 'Registration',

  html: createEmailTemplateHtml(
    `
    <p style="font-weight: normal; margin: 0; margin-bottom: 15px; font-size: 16px; line-height: 25px;" class="mobile_paragraph">
      You have successfully registered with Wit Grit Fit by Avid Adventures.
    </p>
    <p style="font-weight: normal; margin: 0; margin-bottom: 15px; font-size: 16px; line-height: 25px;" class="mobile_paragraph">
      Please log in by clicking the button below and complete your assessments to get your results.
    </p>
  `,
    user.firstName,
    `<th style="box-sizing: border-box;text-align: center; width: 50%">
    <img alt="T@" src="https://i.ibb.co/bzbgC2j/wgf-home.png" style="box-sizing: border-box; border: none; -ms-interpolation-mode: bicubic; max-width: 100%;">
    </th>`,
    `${WEB_BASE_URL}sign-in`,
    `Sign in`
  ),
});

export const resetPasswordMail = (user: UserEntity, token: string) => ({
  from: `Avid Adventures <${EMAIL_FROM}>`,
  to: user.email,
  bcc: user.email,
  subject: 'Update password link',
  html: createEmailTemplateHtml(
    `
    <p style="font-weight: normal; margin: 0; margin-bottom: 15px; font-size: 16px; line-height: 25px;" class="mobile_paragraph">
      We have received a request to reset your password for your Wit Grit Fit account.
    </p>
    <p style="font-weight: normal; margin: 0; margin-bottom: 15px; font-size: 16px; line-height: 25px;" class="mobile_paragraph">
      Click the button below to reset your password.
    </p>
    <p style="font-weight: normal; margin: 0; margin-bottom: 15px; font-size: 16px; line-height: 25px;" class="mobile_paragraph">
      If you did not request a password reset, you can ignore this email. Your password will not be changed. 
    </p>
  `,
    user.firstName,
    `<th style="box-sizing: border-box;text-align: center; width: 50%; padding: 30px 20px 0;">
    <img alt="T@" src="https://i.ibb.co/S7NvtDF/action-image.png" style="box-sizing: border-box; border: none; -ms-interpolation-mode: bicubic; max-width: 100%;">
    </th>`,
    `${WEB_BASE_URL}password/?token=${token}`,
    `Reset password`
  ),
});

export const trainerToExistingStudentMail = (
  user: UserEntity,
  trainerName: string,
  token: string
) => ({
  from: `Avid Adventures <${EMAIL_FROM}>`,
  to: user.email,
  bcc: user.email,
  subject: 'Invitation from Trainer',
  html: createEmailTemplateHtml(
    `
    <p style="font-weight: normal; margin: 0; margin-bottom: 15px; font-size: 16px; line-height: 25px;" class="mobile_paragraph">
    You received an invite from <strong>${trainerName}</strong> to join his/her group.
    </p>
    <p style="font-weight: normal; margin: 0; margin-bottom: 15px; font-size: 16px; line-height: 25px;" class="mobile_paragraph">
    Click the button below to accept the invite. 
    </p>
  `,
    user.firstName,
    `<th style="box-sizing: border-box;txt-align: center; width: 50%; padding: 30px 20px 0;">
    <img alt="T@" src="https://i.ibb.co/S7NvtDF/action-image.png" style="box-sizing: border-box; border: none; -ms-interpolation-mode: bicubic; max-width: 100%;">
    </th>`,
    `${API_BASE_URL}invitation/accept-invitation-trainer-to-existing-student/${token}`,
    `Accept and Sign in`
  ),
});

export const trainerToStudentMail = (
  email: string,
  userName: string,
  trainerName: string,
  token: string
) => ({
  from: `Avid Adventures <${EMAIL_FROM}>`,
  to: email,
  bcc: email,
  subject: 'Invitation from Trainer',
  html: createEmailTemplateHtml(
    `
    <p style="font-weight: normal; margin: 0; margin-bottom: 15px; font-size: 16px; line-height: 25px;" class="mobile_paragraph">
    You received an invite from <strong>${trainerName}</strong> to to set up an account with Wit Grit Fit by Avid Adventures and join his/her group.
    </p>
    <p style="font-weight: normal; margin: 0; margin-bottom: 15px; font-size: 16px; line-height: 25px;" class="mobile_paragraph">
    Click the button below to accept the invite. 
    </p>
  `,
    userName,
    `<th style="box-sizing: border-box;text-align: center; width: 50%; padding: 30px 20px 0;">
    <img alt="T@" src="https://i.ibb.co/S7NvtDF/action-image.png" style="box-sizing: border-box; border: none; -ms-interpolation-mode: bicubic; max-width: 100%;">
    </th>`,
    `${API_BASE_URL}invitation/accept-invitation-not-exist-user/${token}`,
    `Sign up and Accept`
  ),
});

export const adminToExistingTrainerMail = (
  user: UserEntity,
  superAdminName: string,
  token: string
) => ({
  from: `Avid Adventures <${EMAIL_FROM}>`,
  to: user.email,
  bcc: user.email,
  subject: 'Invitation from Super Admin',
  html: createEmailTemplateHtml(
    `
    <p style="font-weight: normal; margin: 0; margin-bottom: 15px; font-size: 16px; line-height: 25px;" class="mobile_paragraph">
    You received an invite from <strong>${superAdminName}</strong> to become trainer admin with Wit Grit Fit by Avid Adventures.
    </p>
    <p style="font-weight: normal; margin: 0; margin-bottom: 15px; font-size: 16px; line-height: 25px;" class="mobile_paragraph">
    Click the buttom below to accept the invite. 
    </p>
  `,
    user.firstName,
    `<th style="box-sizing: border-box;text-align: center; width: 50%; padding: 30px 20px 0;">
    <img alt="T@" src="https://i.ibb.co/8YQBs7H/super-admin-image.png" style="box-sizing: border-box; border: none; -ms-interpolation-mode: bicubic; max-width: 100%;">
    </th>`,
    `${API_BASE_URL}invitation/accept-invitation-existing-trainer/${token}`,
    `Accept and Sign in`
  ),
});
export const emailVerificationMail = (
  email: string,
  userName: string,
  emailSecret: number
) => ({
  from: `Avid Adventures <${EMAIL_FROM}>`,
  to: email,
  bcc: email,
  subject: 'Verification for changing email',
  html: createEmailTemplateWithoutButtonHtml(
    ` <p style="font-weight: normal; margin: 0; margin-bottom: 15px; font-size: 16px; line-height: 25px;" class="mobile_paragraph">
    This is your verification code for changing email address in your profile <strong>${emailSecret}</strong>.
    </p>
    `,
    userName,
    `<th style="box-sizing: border-box;text-align: center; width: 50%; padding: 30px 20px 0;">
    <img alt="T@" src="https://i.ibb.co/8YQBs7H/super-admin-image.png" style="box-sizing: border-box; border: none; -ms-interpolation-mode: bicubic; max-width: 100%;">
    </th>`
  ),
});

export const adminToTrainerMail = (
  email: string,
  userName: string,
  superAdminName: string,
  token: string
) => ({
  from: `Avid Adventures <${EMAIL_FROM}>`,
  to: email,
  bcc: email,
  subject: 'Invitation from Super Admin',
  html: createEmailTemplateHtml(
    `
    <p style="font-weight: normal; margin: 0; margin-bottom: 15px; font-size: 16px; line-height: 25px;" class="mobile_paragraph">
    You received an invite from <strong>${superAdminName}</strong> to set up an account as a trainer admin with Wit Grit Fit by Avid Adventures.
    </p>
    <p style="font-weight: normal; margin: 0; margin-bottom: 15px; font-size: 16px; line-height: 25px;" class="mobile_paragraph">
    Click the button below to accept the invite and set up the account. 
    </p>
  `,
    userName,
    `<th style="box-sizing: border-box;text-align: center; width: 50%; padding: 30px 20px 0;">
    <img alt="T@" src="https://i.ibb.co/8YQBs7H/super-admin-image.png" style="box-sizing: border-box; border: none; -ms-interpolation-mode: bicubic; max-width: 100%;">
    </th>`,
    `${API_BASE_URL}invitation/accept-invitation-not-exist-user/${token}`,
    `Sign up and Accept`
  ),
});

export const studentToTrainerMail = (
  trainer: UserEntity,
  studentName: string,
  token: string
) => ({
  from: `Avid Adventures <${EMAIL_FROM}>`,
  to: trainer.email,
  bcc: trainer.email,
  subject: 'Request from Student',
  html: createEmailTemplateHtml(
    `
    <p style="font-weight: normal; margin: 0; margin-bottom: 15px; font-size: 16px; line-height: 25px;" class="mobile_paragraph">
    You received a trainer request from student: ${studentName}
    </p>
    <p style="font-weight: normal; margin: 0; margin-bottom: 15px; font-size: 16px; line-height: 25px;" class="mobile_paragraph">
    Click the buttom below to accept the request. 
    </p>
  `,
    trainer.firstName,
    `<th style="box-sizing: border-box;text-align: center; width: 50%; padding: 30px 20px 0;">
    <img alt="T@" src="https://i.ibb.co/S7NvtDF/action-image.png" style="box-sizing: border-box; border: none; -ms-interpolation-mode: bicubic; max-width: 100%;">
    </th>`,
    `${API_BASE_URL}invitation/accept-request-trainer/${token}`,
    `Accept and Sign in`
  ),
});

export const adminToUserMail = (
  email: string,
  userName: string,
  adminName: string,
  token: string
) => ({
  from: `Avid Adventures <${EMAIL_FROM}>`,
  to: email,
  bcc: email,
  subject: 'Request to set up an account with Wit Grit Fit by Avid Adventures',
  html: createEmailTemplateHtml(
    `
    <p style="font-weight: normal; margin: 0; margin-bottom: 15px; font-size: 16px; line-height: 25px;" class="mobile_paragraph">
      You received an invite from <strong>${adminName}</strong> to set up an account with Wit Grit Fit by Avid Adventures.
    </p>
    <p style="font-weight: normal; margin: 0; margin-bottom: 15px; font-size: 16px; line-height: 25px;" class="mobile_paragraph">
      Click the button below to accept the invite. 
    </p>
  `,
    userName,
    `<th style="box-sizing: border-box;text-align: center; width: 50%; padding: 30px 20px 0;">
    <img alt="T@" src="https://i.ibb.co/8YQBs7H/super-admin-image.png" style="box-sizing: border-box; border: none; -ms-interpolation-mode: bicubic; max-width: 100%;">
    </th>`,
    `${API_BASE_URL}invitation/accept-invitation-not-exist-user/${token}`,
    `Sign up and Accept`
  ),
});

const createEmailTemplateHtml = (
  emailBody: string,
  name: string,
  imageRow?: string,
  redirectPath?: string,
  buttonText?: string
) =>
  `<!doctype html>
  <html>
  <head>
  <meta name="viewport" content="width=device-width">
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
  <meta name="format-detection" content="telephone=no">
  <style>
  @media only screen and (max-width:500px) {
    table[class=body] p,
    table[class=body] ul,
    table[class=body] ol,
    table[class=body] td,
    table[class=body] span,
    table[class=body] a {
      font-size: 15px !important;
    }

    table[class=body] .content_wrapper {
      padding: 20px !important;
    }

    table[class=body] .button_mobile {
      padding: 13px 30px !important;
    }

    table[class=body] .logo {
      text-align: center !important;
    }
  }
  @media only screen and (max-width:700px) {
    table[class=body] .container {
      width: 100% !important;
    }

    table[class=body] .main {
      border-left-width: 0 !important;
      border-radius: 0 !important;
      border-right-width: 0 !important;
    }

    table[class=body] .mobile_paragraph {
      width: 90% !important;
    }
  }
</style>
  </head>
  <body style="background-color: #f6f6f6; -webkit-font-smoothing: antialiased; font-size: 14px; line-height: 1.4; margin: 0; padding: 0; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; font-family: 'Arial', sans-serif;">
  <table border="0" cellpadding="0" cellspacing="0" class="body" style="border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; width: 100%;" width="100%">
  <tr>
  <td style="font-size: 14px; vertical-align: top;" valign="top">&nbsp;</td>
  <td class="container" style="font-size: 14px; vertical-align: top; display: block; max-width: 600px; width: 600px; margin: 0 auto;" width="600" valign="top">
  <div class="content" style="box-sizing:border-box;display:block;margin:0 auto;max-width:600px; padding:10px;background:#F7F8FB">
  <table class="main" style="border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; width: 100%;" width="100%">
  <tr>
  <td style="font-size: 14px; vertical-align: top;" valign="top">
  <table border="0" style="border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; width: 100%; max-width: 100%; min-width: 100%; background: #f1f1f2; background: linear-gradient(90deg, rgba(0,174,239,0.07) 0%, rgba(239,96,163,0.07) 50%, rgba(141,198,63,0.07) 100%); box-sizing: border-box;" width="100%">
  <tr style="box-sizing: border-box;">
  <th style="box-sizing: border-box; font-size: 0; padding: 0 20px; width: 50%; padding: 30px 20px;" class="logo">
  <img alt="T@" src="https://i.ibb.co/6RrhGTj/WGF-Logo.png" style="box-sizing: border-box; border: none; -ms-interpolation-mode: bicubic; max-width: 100%;">
  </th>
  ${imageRow}
  </tr>
  </table>
  <table border="0" cellpadding="0" cellspacing="0" class="content_wrapper" style="border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; background: #ffffff; padding: 40px; width: 100%; max-width: 100%;" width="100%">
  <tr>
  <td style="font-size: 14px; vertical-align: top;" valign="top">
  <p style="font-weight: normal; margin: 0; Margin-bottom: 15px; font-size: 16px; line-height: 25px;" class="mobile_paragraph"> 
  Hi <strong>${name}</strong>,
  </p>
  ${emailBody}
  <p style="font-weight: normal; margin: 0; Margin-bottom: 15px; font-size: 16px; line-height: 25px; padding-top: 30px;" class="mobile_paragraph">
  Thank you!
  </p>
  <p style="font-weight: normal; margin: 0; Margin-bottom: 15px; font-size: 16px; line-height: 25px;" class="mobile_paragraph">
  Jac at Wit Grit Fit  
  </p>
  <table border="0" cellpadding="0" cellspacing="0" style="border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; width: 100%; padding: 10px 0;" width="100%">
<tr>
<td style="font-size: 14px; vertical-align: top;" valign="top">
<a style="margin-right:10px;text-decoration:none" href="${WEB_BASE_URL}">
<img alt="website" src="https://i.ibb.co/StLpw9x/website.png" style="border: none; -ms-interpolation-mode: bicubic; max-width: 100%; undefined: display; undefined: inline-block; height: 20px; width: 20px;" width="20" height="20">
</a>
<a style="margin-right:10px;text-decoration:none" href="https://www.facebook.com/avidadventures/">
<img alt="facebook" src="https://i.ibb.co/QcqHRDC/facebook.png" style="border: none; -ms-interpolation-mode: bicubic; max-width: 100%; undefined: display; undefined: inline-block; height: 20px; width: 20px;" width="20" height="20">
</a>
<a style="margin-right:10px;text-decoration:none" href="https://sg.linkedin.com/company/witgritfit">
<img alt="linkedin" src="https://i.ibb.co/kySWwh6/linkedin.png" style="border: none; -ms-interpolation-mode: bicubic; max-width: 100%; undefined: display; undefined: inline-block; height: 20px; width: 20px;" width="20" height="20">
</a>
</td>
</tr>
</table>
<table border="0" cellpadding="0" cellspacing="0" style="border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; width: 100%; margin: 45px 0;" width="100%">
<tr>
<td style="font-size: 14px; vertical-align: top;" valign="top">
<a class="button_mobile" href="${redirectPath}" style="display:block;background-color:#00AEEF;border-radius:25px;padding:12px 50px;color:#ffffff;font-weight:bold;text-decoration:none;width:max-content">
${buttonText}
</a>
</td>
</tr>
</table>
  <table border="0" cellpadding="0" cellspacing="0" style="border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; width: 100%; margin: 30px 0;" width="100%">
  <tr>
  <td style="font-size: 14px; vertical-align: top;" valign="top">
  </td>
  </tr>
  </table>
  </td>
  </tr>
  </table>
  </td>
  </tr>
  </table>
  </div>
  </td>
  <td style="font-size: 14px; vertical-align: top;" valign="top">&nbsp;</td>
  </tr>
  </table>
  </body>
  </html>
  `;
const createEmailTemplateWithoutButtonHtml = (
  emailBody: string,
  name: string,
  imageRow?: string
) => `<!doctype html>
<html>
<head>
<meta name="viewport" content="width=device-width">
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<meta name="format-detection" content="telephone=no">
<style>
@media only screen and (max-width:500px) {
  table[class=body] p,
  table[class=body] ul,
  table[class=body] ol,
  table[class=body] td,
  table[class=body] span,
  table[class=body] a {
    font-size: 15px !important;
  }

  table[class=body] .content_wrapper {
    padding: 20px !important;
  }

  table[class=body] .button_mobile {
    padding: 13px 30px !important;
  }

  table[class=body] .logo {
    text-align: center !important;
  }
}
@media only screen and (max-width:700px) {
  table[class=body] .container {
    width: 100% !important;
  }

  table[class=body] .main {
    border-left-width: 0 !important;
    border-radius: 0 !important;
    border-right-width: 0 !important;
  }

  table[class=body] .mobile_paragraph {
    width: 90% !important;
  }
}
</style>
</head>
<body style="background-color: #f6f6f6; -webkit-font-smoothing: antialiased; font-size: 14px; line-height: 1.4; margin: 0; padding: 0; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; font-family: 'Arial', sans-serif;">
<table border="0" cellpadding="0" cellspacing="0" class="body" style="border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; width: 100%;" width="100%">
<tr>
<td style="font-size: 14px; vertical-align: top;" valign="top">&nbsp;</td>
<td class="container" style="font-size: 14px; vertical-align: top; display: block; max-width: 600px; width: 600px; margin: 0 auto;" width="600" valign="top">
<div class="content" style="box-sizing:border-box;display:block;margin:0 auto;max-width:600px; padding:10px;background:#F7F8FB">
<table class="main" style="border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; width: 100%;" width="100%">
<tr>
<td style="font-size: 14px; vertical-align: top;" valign="top">
<table border="0" style="border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; width: 100%; max-width: 100%; min-width: 100%; background: #f1f1f2; background: linear-gradient(90deg, rgba(0,174,239,0.07) 0%, rgba(239,96,163,0.07) 50%, rgba(141,198,63,0.07) 100%); box-sizing: border-box;" width="100%">
<tr style="box-sizing: border-box;">
<th style="box-sizing: border-box; font-size: 0; padding: 0 20px; width: 50%; padding: 30px 20px;" class="logo">
<img alt="T@" src="https://i.ibb.co/6RrhGTj/WGF-Logo.png" style="box-sizing: border-box; border: none; -ms-interpolation-mode: bicubic; max-width: 100%;">
</th>
${imageRow}
</tr>
</table>
<table border="0" cellpadding="0" cellspacing="0" class="content_wrapper" style="border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; background: #ffffff; padding: 40px; width: 100%; max-width: 100%;" width="100%">
<tr>
<td style="font-size: 14px; vertical-align: top;" valign="top">
<p style="font-weight: normal; margin: 0; Margin-bottom: 15px; font-size: 16px; line-height: 25px;" class="mobile_paragraph"> 
Hi <strong>${name}</strong>,
</p>
${emailBody}
<p style="font-weight: normal; margin: 0; Margin-bottom: 15px; font-size: 16px; line-height: 25px; padding-top: 30px;" class="mobile_paragraph">
Thank you!
</p>
<p style="font-weight: normal; margin: 0; Margin-bottom: 15px; font-size: 16px; line-height: 25px;" class="mobile_paragraph">
Jac at Wit Grit Fit  
</p>
<table border="0" cellpadding="0" cellspacing="0" style="border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; width: 100%; padding: 10px 0;" width="100%">
<tr>
<td style="font-size: 14px; vertical-align: top;" valign="top">
<a style="margin-right:10px;text-decoration:none" href="${WEB_BASE_URL}">
<img alt="website" src="https://i.ibb.co/StLpw9x/website.png" style="border: none; -ms-interpolation-mode: bicubic; max-width: 100%; undefined: display; undefined: inline-block; height: 20px; width: 20px;" width="20" height="20">
</a>
<a style="margin-right:10px;text-decoration:none" href="https://www.facebook.com/avidadventures/">
<img alt="facebook" src="https://i.ibb.co/QcqHRDC/facebook.png" style="border: none; -ms-interpolation-mode: bicubic; max-width: 100%; undefined: display; undefined: inline-block; height: 20px; width: 20px;" width="20" height="20">
</a>
<a style="margin-right:10px;text-decoration:none" href="https://sg.linkedin.com/company/witgritfit">
<img alt="linkedin" src="https://i.ibb.co/kySWwh6/linkedin.png" style="border: none; -ms-interpolation-mode: bicubic; max-width: 100%; undefined: display; undefined: inline-block; height: 20px; width: 20px;" width="20" height="20">
</a>
</td>
</tr>
</table>
<table border="0" cellpadding="0" cellspacing="0" style="border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; width: 100%; margin: 30px 0;" width="100%">
<tr>
<td style="font-size: 14px; vertical-align: top;" valign="top">
</td>
</tr>
</table>
</td>
</tr>
</table>
</td>
</tr>
</table>
</div>
</td>
<td style="font-size: 14px; vertical-align: top;" valign="top">&nbsp;</td>
</tr>
</table>
</body>
</html>
`;
