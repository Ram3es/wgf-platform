import { config } from 'src/constants/config';

const WEB_BASE_URL = config().urls.webUrl;

export type TLinkBtn = Record<'path' | 'nameBtn', string>;
export interface ILink {
  loginBtn: TLinkBtn;
  takeFlex: TLinkBtn;
}
export const LINK: ILink = {
  loginBtn: { path: `${WEB_BASE_URL}sign-in`, nameBtn: 'Log in' },
  takeFlex: {
    path: `${WEB_BASE_URL}career-flex`,
    nameBtn: 'Take CareerFlex Quiz',
  },
};

export const MAIL_CONTENT = {
  aboutCanvasParagraph: `<p style="font-weight: normal; margin: 0; margin-bottom: 15px; font-size: 16px; line-height: 25px;" class="mobile_paragraph">
  Do you know what are your natural strengths, performance characters and career anchors? With low job satisfaction plaguing employees across the globe, workers are now seeking ways to build a well-lived joyful life.
  </p>
  <p style="font-weight: normal; margin: 0; margin-bottom: 15px; font-size: 16px; line-height: 25px;" class="mobile_paragraph">Use our Career Canvas to discover your WIT, GRIT and FIT to design a career path that is aligned to what matters most to you.
  </p>`,

  aboutFlexParagraph: `<p style="font-weight: normal; margin: 0; margin-bottom: 15px; font-size: 16px; line-height: 25px;" class="mobile_paragraph">
  With rapid changes sweeping the world of work, do you have what it takes to stay relevant and benefit from the opportunities that are all around?
  </p>
  <p style="font-weight: normal; margin: 0; margin-bottom: 15px; font-size: 16px; line-height: 25px;" class="mobile_paragraph">Building on decades of research, this CareerFlex quiz helps you identify your career adaptability superpowers, and shows you how you could flex your career, bringing it to the next level.
  </p>`,

  footerMail: `If you  have any questions regarding your test results, you can always drop us an email at jac@witgritfit.com and we will be happy to help!`,

  footerLink: `
  For more insights, check out our other <a href="https://witgritfit.com/my-career-adventure/">Free Tools<a/> that can help you get started on career planning. `,

  phoneImg: `<a href='#' style="cursor: default;">
  <img alt="T@"  src="https://i.ibb.co/j5sJ9XJ/Man-With-Lap-Top.png" style="box-sizing: border-box; border: none; border="0"; -ms-interpolation-mode: bicubic; max-width: 100%;">
  </a>`,
  laptopImg: `<a href='#' style="cursor: default;">
  <img alt="T@"  src="https://i.ibb.co/8Dmr2qc/Laptopn-business-office-Career-Flex.png" style="box-sizing: border-box; border: none; border="0"; -ms-interpolation-mode: bicubic; max-width: 100%;">
  </a>`,
  dividerImg: `<img alt="T@" src="https://i.ibb.co/hg4B21Y/Gradual-Blue-wave-1.png" style="box-sizing: border-box; border: none; -ms-interpolation-mode: bicubic; max-width: 100%;">`,

  footerImg: `<a href="#"><img alt="T@" src="https://i.ibb.co/w0dzgxz/Macbook-Career-Adventure.png" style="box-sizing: border-box; border: none; -ms-interpolation-mode: bicubic; max-width: 100%;"><a>`,

  logoImg: `<img alt="T@" src="https://i.ibb.co/6RrhGTj/WGF-Logo.png" style="box-sizing: border-box; border: none; -ms-interpolation-mode: bicubic; max-width: 100%;">`,

  socialLinks: `<td style="font-size: 14px; vertical-align: top;" valign="top">
  <a style="margin-right:10px;text-decoration:none" href="${WEB_BASE_URL}">
   <img alt="website" src="https://i.ibb.co/StLpw9x/website.png" style="border: none; -ms-interpolation-mode: bicubic; max-width: 100%; undefined: display; undefined: inline-block; height: 20px; width: 20px;" width="20" height="20">
  </a>
  <a style="margin-right:10px;text-decoration:none" href="https://www.facebook.com/avidadventures/">
   <img alt="facebook" src="https://i.ibb.co/QcqHRDC/facebook.png" style="border: none; -ms-interpolation-mode: bicubic; max-width: 100%; undefined: display; undefined: inline-block; height: 20px; width: 20px;" width="20" height="20">
  </a>
  <a style="margin-right:10px;text-decoration:none" href="https://sg.linkedin.com/company/witgritfit">
   <img alt="linkedin" src="https://i.ibb.co/kySWwh6/linkedin.png" style="border: none; -ms-interpolation-mode: bicubic; max-width: 100%; undefined: display; undefined: inline-block; height: 20px; width: 20px;" width="20" height="20">
  </a>
</td>`,
};
