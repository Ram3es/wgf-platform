import { config } from 'src/constants/config';
import { UserEntity } from 'src/user/entities/user.entity';
import { MAIL_CONTENT, ILink, LINK, TLinkBtn } from './messages.constants';
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
const ROLES_TITLE = {
  trainerAdmin: 'Trainer Admin',
  user: 'User',
};

export const caasQuizResultMessage = (
  user: UserEntity,
  pdf: string
): IMessage => ({
  from: `Avid Adventures <${EMAIL_FROM}>`,

  to: `${user.firstName} ${user.lastName}<${user.email}>`,
  bcc: user.email,

  subject: 'Your Career Flex results are in!',

  html: createTemplateQuizCompetitionWithoutBtn(
    `<p style="font-weight: normal; margin: 0; margin-bottom: 15px; font-size: 16px; line-height: 25px;" class="mobile_paragraph">
    The results of your Career Flex are in! You can download the attachment below or view your results by logging into your account <a href=${WEB_BASE_URL}sign-in>here</a>.
    </p>
    <p style="font-weight: normal; margin: 0; margin-bottom: 15px; font-size: 16px; line-height: 25px;" class="mobile_paragraph">
    You have identified your career adaptability superpowers and are now ready take your career to the next level!
    </p>`,
    user.firstName,
    `<th style="box-sizing: border-box;text-align: right; width: 50%">
    <img alt="T@" src="https://i.ibb.co/fXq9Zwv/career-flex.png" style="box-sizing: border-box; border: none; -ms-interpolation-mode: bicubic; max-width: 100%;">
    </th>`,
    MAIL_CONTENT.aboutCanvasParagraph
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

  subject: 'Your Career Canvas is ready!',

  html: createCanvasResultTemplate(
    `<p style="font-weight: normal; margin: 0; margin-bottom: 15px; font-size: 16px; line-height: 25px;" class="mobile_paragraph">
    Thank you for completing your Career Canvas. You're on your way to designing a career that you love! 
    </p>
    <p style="font-weight: normal; margin: 0; margin-bottom: 15px; font-size: 16px; line-height: 25px;" class="mobile_paragraph">
    You can download the attachment below or view your results by logging into your account <a href=${WEB_BASE_URL}sign-in>here</a>.
    </p>
  `,
    user.firstName,
    `<th style="box-sizing: border-box;text-align: right; width: 50%; padding: 10px 20px;">
    <img alt="T@" src="https://i.ibb.co/9shhb94/Canvas-Logo.png" style="box-sizing: border-box; border: none; -ms-interpolation-mode: bicubic; max-width: 100%;">
    </th>`,
    MAIL_CONTENT.aboutFlexParagraph,
    LINK.takeFlex
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

  to: user.email,
  bcc: user.email,

  subject: 'Begin your career journey with confidence!',

  html: templateHtmlRegistration(
    `<p style="font-weight: normal; margin: 0; margin-bottom: 15px; font-size: 16px; line-height: 25px;" class="mobile_paragraph">
   Welcome to WITGRITFIT! 
    </p>
    <p style="font-weight: normal; margin: 0; margin-bottom: 15px; font-size: 16px; line-height: 25px;" class="mobile_paragraph">
    We are excited to help you embark on your career design journey. Now that you've signed up for an account, you can now log in to access our Career Tools.
    </p>
  `,
    user.firstName,
    `<th style="box-sizing: border-box;text-align: center; width: 50%">
    <img alt="T@" src="https://i.ibb.co/bzbgC2j/wgf-home.png" style="box-sizing: border-box; border: none; -ms-interpolation-mode: bicubic; max-width: 100%;">
    </th>`,
    MAIL_CONTENT.aboutCanvasParagraph,
    LINK,
    MAIL_CONTENT.aboutFlexParagraph
  ),
});

export const userWasRegistered = (user: UserEntity, admin: UserEntity) => ({
  from: `Avid Adventures <${EMAIL_FROM}>`,

  to: admin.email,
  bcc: admin.email,

  subject: 'Here comes a new user!',

  html: createEmailTemplateHtml(
    `
    <p style="font-weight: normal; margin: 0; margin-bottom: 15px; font-size: 16px; line-height: 25px;" class="mobile_paragraph">
    Congratulations! The user  <b>${user.firstName}  ${user.lastName} </b> has signed up for a WITGRITFIT account.
    </p>
    <p style="font-weight: normal; margin: 0; margin-bottom: 15px; font-size: 16px; line-height: 25px;" class="mobile_paragraph">
    You can view him/her in your Manage Users section.
    </p>
  `,
    admin.firstName,
    `<th style="box-sizing: border-box;text-align: center; width: 50%">
    <img alt="T@" src="https://i.ibb.co/bzbgC2j/wgf-home.png" style="box-sizing: border-box; border: none; -ms-interpolation-mode: bicubic; max-width: 100%;">
    </th>`,
    `${WEB_BASE_URL}sign-in`,
    `Log in`
  ),
});

export const resetPasswordMail = (user: UserEntity, token: string) => ({
  from: `Avid Adventures <${EMAIL_FROM}>`,
  to: user.email,
  bcc: user.email,
  subject: 'Reset your WITGRITFIT password',
  html: createEmailTemplateHtml(
    `
    <p style="font-weight: normal; margin: 0; margin-bottom: 15px; font-size: 16px; line-height: 25px;" class="mobile_paragraph">
      We have received a request to reset your password for your WITGRITFIT account.
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
  subject: `You're invited to a group!`,
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
    `Accept`
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
  subject: `You're invited to set up an account!`,
  html: createEmailTemplateHtml(
    `
    <p style="font-weight: normal; margin: 0; margin-bottom: 15px; font-size: 16px; line-height: 25px;" class="mobile_paragraph">
    You received an invite from <strong>${trainerName}</strong> to create an account and join his/her group.
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
    `Sign up`
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
  subject: `You're invited to be a WITGRITFIT Trainer Admin!`,
  html: createEmailTemplateHtml(
    `
    <p style="font-weight: normal; margin: 0; margin-bottom: 15px; font-size: 16px; line-height: 25px;" class="mobile_paragraph">
    You received an invite from <strong>${superAdminName}</strong> to become a Trainer Admin with WITGRITFIT.
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
    `Register`
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
  subject: 'Changing your email?',
  html: createEmailTemplateWithoutButtonHtml(
    ` <p style="font-weight: normal; margin: 0; margin-bottom: 15px; font-size: 16px; line-height: 25px;" class="mobile_paragraph">
    We have received a request to change your email address linked to your WITGRITFIT account.
    </p>
    <p style="font-weight: normal; margin: 0; margin-bottom: 15px; font-size: 16px; line-height: 25px;" class="mobile_paragraph">
    Please type in your verification code on the login screen: <strong>${emailSecret}</strong>
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
  subject: `You're invited to be a WITGRITFIT Trainer Admin!`,
  html: createEmailTemplateHtml(
    `
    <p style="font-weight: normal; margin: 0; margin-bottom: 15px; font-size: 16px; line-height: 25px;" class="mobile_paragraph">
    You received an invite from <strong>${superAdminName}</strong> to become a Trainer Admin with WITGRITFIT.
    </p>
    <p style="font-weight: normal; margin: 0; margin-bottom: 15px; font-size: 16px; line-height: 25px;" class="mobile_paragraph">
    Click the link below to accept the invite. 
    </p>
  `,
    userName,
    `<th style="box-sizing: border-box;text-align: center; width: 50%; padding: 30px 20px 0;">
    <img alt="T@" src="https://i.ibb.co/8YQBs7H/super-admin-image.png" style="box-sizing: border-box; border: none; -ms-interpolation-mode: bicubic; max-width: 100%;">
    </th>`,
    `${API_BASE_URL}invitation/accept-invitation-not-exist-user/${token}`,
    `Register`
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
  subject: `You've received a request from a student!`,
  html: createEmailTemplateHtml(
    `
    <p style="font-weight: normal; margin: 0; margin-bottom: 15px; font-size: 16px; line-height: 25px;" class="mobile_paragraph">
    You received a trainer request from student <strong>${studentName}</strong>
    </p>
    <p style="font-weight: normal; margin: 0; margin-bottom: 15px; font-size: 16px; line-height: 25px;" class="mobile_paragraph">
    Click the button below to accept the request. 
    </p>
  `,
    trainer.firstName,
    `<th style="box-sizing: border-box;text-align: center; width: 50%; padding: 30px 20px 0;">
    <img alt="T@" src="https://i.ibb.co/S7NvtDF/action-image.png" style="box-sizing: border-box; border: none; -ms-interpolation-mode: bicubic; max-width: 100%;">
    </th>`,
    `${API_BASE_URL}invitation/accept-request-trainer/${token}`,
    `Accept`
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
  subject: 'Begin your career design journey!',
  html: createEmailTemplateHtml(
    `
    <p style="font-weight: normal; margin: 0; margin-bottom: 15px; font-size: 16px; line-height: 25px;" class="mobile_paragraph">
    You received an invitation from<strong>${adminName}</strong> to sign up for an account with WITGRITFIT.
    </p>
    <p style="font-weight: normal; margin: 0; margin-bottom: 15px; font-size: 16px; line-height: 25px;" class="mobile_paragraph">
      Click the button below to accept the invite! 
    </p>
  `,
    userName,
    `<th style="box-sizing: border-box;text-align: center; width: 50%; padding: 30px 20px 0;">
    <img alt="T@" src="https://i.ibb.co/8YQBs7H/super-admin-image.png" style="box-sizing: border-box; border: none; -ms-interpolation-mode: bicubic; max-width: 100%;">
    </th>`,
    `${API_BASE_URL}invitation/accept-invitation-not-exist-user/${token}`,
    `Sign up `
  ),
});
export const adminChangedRole = (
  email: string,
  userName: string,
  userRole: string
) => ({
  from: `Avid Adventures <${EMAIL_FROM}>`,
  to: email,
  bcc: email,
  subject: 'You have a new role',
  html: createEmailTemplateHtml(
    `
    <p style="font-weight: normal; margin: 0; margin-bottom: 15px; font-size: 16px; line-height: 25px;" class="mobile_paragraph">
    You have a new role as <strong>${ROLES_TITLE[userRole]}</strong> assigned to your WITGRITFIT account.
    </p>
    <p style="font-weight: normal; margin: 0; margin-bottom: 15px; font-size: 16px; line-height: 25px;" class="mobile_paragraph">
    Click the button below to sign in with your new status.  
    </p>
  `,
    userName,
    `<th style="box-sizing: border-box;text-align: center; width: 50%; padding: 30px 20px 0;">
    <img alt="T@" src="https://i.ibb.co/8YQBs7H/super-admin-image.png" style="box-sizing: border-box; border: none; -ms-interpolation-mode: bicubic; max-width: 100%;">
    </th>`,
    `${WEB_BASE_URL}sign-in`,
    `Log in`
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
  <table border="0" cellpadding="0" cellspacing="0" style="border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; width: 100%; margin: 45px 0;" width="100%">
  <tr>
  <td style="font-size: 14px; vertical-align: top;" valign="top">
  <a class="button_mobile" href="${redirectPath}" style="display:block;background-color:#00AEEF;border-radius:25px;padding:12px 50px;color:#ffffff;font-weight:bold;text-decoration:none;width:max-content">
  ${buttonText}
  </a>
  </td>
  </tr>
  </table>
  
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

const createTemplateQuizCompetitionWithoutBtn = (
  firstParagraf: string,
  firstName: string,
  imageRow: string,
  aboutCanvasParagraph: string
) => `
<!doctype html>
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
  <body style="background-color: #f6f6f6";-webkit-font-smoothing: antialiased; font-size: 14px; line-height: 1.4; margin: 0; padding: 0; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; font-family: 'Arial', sans-serif;">
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
           ${MAIL_CONTENT.logoImg}
           </th>
           ${imageRow}
         </tr>
        </table>
        <table border="0" cellpadding="0" cellspacing="0" class="content_wrapper" style="border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; background: #ffffff; padding: 40px 67.4px; width: 100%; max-width: 100%;" width="100%">
         <tr>
         <td style="font-size: 14px; vertical-align: top;" valign="top">
          <p style="font-weight: normal; margin: 0; Margin-bottom: 15px; font-size: 16px; line-height: 25px;" class="mobile_paragraph"> 
           Hi <strong>${firstName}</strong>,
         </p>
         ${firstParagraf}
         <table border="0" cellpadding="0" cellspacing="0" class="content_wrapper" style="border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; background: #ffffff; padding:40px 0; width: 100%;  max-width: 100%;" width="100%">
          <tr style="box-sizing: border-box;">
           <th style="box-sizing: border-box; font-size: 0; padding: 0 12px; width: 100%; ">
            <a href='#' style="cursor: default;">
            <img alt="T@"  src="https://i.ibb.co/j5sJ9XJ/Man-With-Lap-Top.png" style="box-sizing: border-box; border: none; border="0"; -ms-interpolation-mode: bicubic; max-width: 100%;">
            </a>
           </th>
          </tr>
         </table>
         ${aboutCanvasParagraph}
         <table border="0" cellpadding="0" cellspacing="0" class="content_wrapper" style="border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; background: #ffffff; padding:0; width: 100%; max-width: 100%;" width="100%">
         <tr style="box-sizing: border-box;">
          <td style="box-sizing: border-box; font-size: 0; padding: 30px 0; width: 100%;">
          ${MAIL_CONTENT.dividerImg}
          </td>
         </tr>
        </table>
        <p style="font-weight: normal; margin: 0; margin-bottom: 15px;margin-top: 15px;   font-size: 16px; line-height: 25px;" class="mobile_paragraph">${MAIL_CONTENT.footerMail}
        </p>
        <p style="font-weight: normal; margin: 0; margin-bottom: 15px;   font-size: 16px; line-height: 25px;" class="mobile_paragraph">${MAIL_CONTENT.footerLink}</p>
        <table border="0" style="border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; width: 100%; max-width: 100%; min-width: 100%;  box-sizing: border-box;" width="100%">
         <tr style="box-sizing: border-box;">
          <td style="font-size: 16px; vertical-align: top;  width: 50%; valign="top">
          <p style="font-weight: normal; margin: 0; margin-bottom: 15px;   font-size: 16px; line-height: 25px;" class="mobile_paragraph">Until next time!</p>
          <p style="font-weight: normal; margin: 0; margin-bottom: 15px;   font-size: 16px; line-height: 25px;" class="mobile_paragraph">The WITGRITFIT Team</p>
           <table border="0" cellpadding="0" cellspacing="0" style="border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; width: 100%; padding: 10px 0;" width="100%">
            <tr>
            ${MAIL_CONTENT.socialLinks}
          </tr>
          </table>
          </td>
          <th style="box-sizing: border-box; width: 50%;">
          ${MAIL_CONTENT.footerImg}
          </th>
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
</html>`;

const createCanvasResultTemplate = (
  firstParagraf: string,
  firstName: string,
  imageRow: string,
  aboutFlexParagraph: string,
  link: TLinkBtn
) => `
<!doctype html>
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
  <body style="background-color: #f6f6f6";-webkit-font-smoothing: antialiased; font-size: 14px; line-height: 1.4; margin: 0; padding: 0; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; font-family: 'Arial', sans-serif;">
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
           ${MAIL_CONTENT.logoImg}
           </th>
           ${imageRow}
         </tr>
        </table>
        <table border="0" cellpadding="0" cellspacing="0" class="content_wrapper" style="border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; background: #ffffff; padding: 40px 67.4px; width: 100%; max-width: 100%;" width="100%">
         <tr>
         <td style="font-size: 14px; vertical-align: top;" valign="top">
          <p style="font-weight: normal; margin: 0; Margin-bottom: 15px; font-size: 16px; line-height: 25px;" class="mobile_paragraph"> 
           Hi <strong>${firstName}</strong>,
         </p>
         ${firstParagraf}
         <table border="0" cellpadding="0" cellspacing="0" class="content_wrapper" style="border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; background: #ffffff; padding:30px 0; width: 100%;  max-width: 100%;" width="100%">
          <tr style="box-sizing: border-box;">
           <th style="box-sizing: border-box; font-size: 0; padding: 0; width: 100%; ">
           ${MAIL_CONTENT.laptopImg}
           </th>
          </tr>
         </table>
         ${aboutFlexParagraph}
         <table border="0" cellpadding="0" cellspacing="0" style="border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; width: 100%; margin: 20px 0 20px;" width="100%">
          <tr>
           <td style="font-size: 14px; vertical-align: top;" valign="top">
             <a class="button_mobile" href="${link.path}career-flex" style="display:block;background-color:#9ACA3C;border-radius:25px;padding:12px 50px;color:#ffffff;font-weight:bold; font-size: 16px; line-height: 16px;text-decoration:none; width:max-content">
              ${link.nameBtn}
              </a>
           </td>
         </tr>
         </table>
         <table border="0" cellpadding="0" cellspacing="0" class="content_wrapper" style="border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; background: #ffffff; padding:0; width: 100%; max-width: 100%;" width="100%">
         <tr style="box-sizing: border-box;">
          <td style="box-sizing: border-box; font-size: 0; padding: 20px 0; width: 100%;">
          ${MAIL_CONTENT.dividerImg}
          </td>
         </tr>
        </table>
        <p style="font-weight: normal; margin: 0; margin-bottom: 15px;margin-top: 15px;   font-size: 16px; line-height: 25px;" class="mobile_paragraph">${MAIL_CONTENT.footerMail}
        </p>
        <p style="font-weight: normal; margin: 0; margin-bottom: 15px;   font-size: 16px; line-height: 25px;" class="mobile_paragraph">${MAIL_CONTENT.footerLink}
        </p>
        <table border="0" style="border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; width: 100%; max-width: 100%; min-width: 100%;  box-sizing: border-box;" width="100%">
         <tr style="box-sizing: border-box;">
          <td style="font-size: 16px; vertical-align: top;  width: 50%; valign="top">
          <p style="font-weight: normal; margin: 0; margin-bottom: 15px;   font-size: 16px; line-height: 25px;" class="mobile_paragraph">Until next time!</p>
          <p style="font-weight: normal; margin: 0; margin-bottom: 15px;   font-size: 16px; line-height: 25px;" class="mobile_paragraph">The WITGRITFIT Team</p>
           <table border="0" cellpadding="0" cellspacing="0" style="border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; width: 100%; padding: 10px 0;" width="100%">
            <tr>
            <td style="font-size: 14px; vertical-align: top;" valign="top">
            ${MAIL_CONTENT.socialLinks}
          </td>
          </tr>
          </table>
          </td>
          <th style="box-sizing: border-box; width: 50%;">
        ${MAIL_CONTENT.footerImg}
          </th>
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
</html>`;

const templateHtmlRegistration = (
  firstParagraf: string,
  firstName: string,
  imageRow: string,
  aboutCanvasParagraph: string,
  link: ILink,
  aboutFlexParagraph: string
) => `
<!doctype html>
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
  <body style="background-color: #f6f6f6";-webkit-font-smoothing: antialiased; font-size: 14px; line-height: 1.4; margin: 0; padding: 0; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; font-family: 'Arial', sans-serif;">
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
            ${MAIL_CONTENT.logoImg}
           </th>
           ${imageRow}
         </tr>
        </table>
        <table border="0" cellpadding="0" cellspacing="0" class="content_wrapper" style="border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; background: #ffffff; padding: 40px 67.4px; width: 100%; max-width: 100%;" width="100%">
         <tr>
         <td style="font-size: 14px; vertical-align: top;" valign="top">
          <p style="font-weight: normal; margin: 0; Margin-bottom: 15px; font-size: 16px; line-height: 25px;" class="mobile_paragraph"> 
           Hi <strong>${firstName}</strong>,
         </p>
         ${firstParagraf}
          <table border="0" cellpadding="0" cellspacing="0" style="border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; width: 100%; margin: 20px 0;" width="100%">
           <tr>
            <td style="font-size: 14px; vertical-align: top;" valign="top">
             <a class="button_mobile" href="${link.loginBtn.path}" style="display:block;background-color:#00AEEF;border-radius:25px; font-size: 16px; line-height: 16px;padding:12px 50px;color:#ffffff;font-weight:bold;text-decoration:none;width:max-content">
             ${link.loginBtn.nameBtn}
             </a>
            </td>
           </tr>
         </table>
         <table border="0" cellpadding="0" cellspacing="0" class="content_wrapper" style="border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; background: #ffffff; padding:40px 0; width: 100%;  max-width: 100%;" width="100%">
         <tr style="box-sizing: border-box;">
          <th style="box-sizing: border-box; font-size: 0; padding: 0 12px; width: 100%; ">
           ${MAIL_CONTENT.phoneImg}
          </th>
         </tr>
        </table>
         ${aboutCanvasParagraph}
         <div style="width:100%; background:#888281 ; border:1px solid #888281; margin:25px 0" />
         <table border="0" cellpadding="0" cellspacing="0" class="content_wrapper" style="border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; background: #ffffff; padding:30px 0; width: 100%;  max-width: 100%;" width="100%">
          <tr style="box-sizing: border-box;">
           <th style="box-sizing: border-box; font-size: 0; padding: 0; width: 100%; ">
            ${MAIL_CONTENT.laptopImg}
           </th>
          </tr>
         </table>
         ${aboutFlexParagraph}

         <table border="0" cellpadding="0" cellspacing="0" style="border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; width: 100%; margin: 20px 0 20px;" width="100%">
          <tr>
           <td style="font-size: 14px; vertical-align: top;" valign="top">
             <a class="button_mobile" href="${link.takeFlex.path}career-flex" style="display:block;background-color:#9ACA3C;border-radius:25px;padding:12px 50px;color:#ffffff;font-weight:bold; font-size: 16px; line-height: 16px;text-decoration:none; width:max-content">
              ${link.takeFlex.nameBtn}
              </a>
           </td>
         </tr>
         </table>
         <table border="0" cellpadding="0" cellspacing="0" class="content_wrapper" style="border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; background: #ffffff; padding:0; width: 100%; max-width: 100%;" width="100%">
         <tr style="box-sizing: border-box;">
          <td style="box-sizing: border-box; font-size: 0; padding: 20px 0; width: 100%;">
           ${MAIL_CONTENT.dividerImg}
          </td>
         </tr>
        </table>
        <p style="font-weight: normal; margin: 0; margin-bottom: 15px;margin-top: 15px;   font-size: 16px; line-height: 25px;" class="mobile_paragraph">${MAIL_CONTENT.footerMail}
        </p>
        <p style="font-weight: normal; margin: 0; margin-bottom: 15px;   font-size: 16px; line-height: 25px;" class="mobile_paragraph">${MAIL_CONTENT.footerLink}
        </p>
        <table border="0" style="border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; width: 100%; max-width: 100%; min-width: 100%;  box-sizing: border-box;" width="100%">
         <tr style="box-sizing: border-box;">
          <td style="font-size: 16px; vertical-align: top;  width: 50%; valign="top">
          <p style="font-weight: normal; margin: 0; margin-bottom: 15px;   font-size: 16px; line-height: 25px;" class="mobile_paragraph">Until next time!</p>
          <p style="font-weight: normal; margin: 0; margin-bottom: 15px;   font-size: 16px; line-height: 25px;" class="mobile_paragraph">The WITGRITFIT Team</p>
           <table border="0" cellpadding="0" cellspacing="0" style="border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; width: 100%; padding: 10px 0;" width="100%">
            <tr>
            ${MAIL_CONTENT.socialLinks}
            </tr>
          </table>
          </td>
          <th style="box-sizing: border-box; width: 50%;">
          ${MAIL_CONTENT.footerImg}
          </th>
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
</html>`;
