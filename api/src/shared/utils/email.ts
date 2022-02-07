import { createTransport } from 'nodemailer';

import * as aws from '@aws-sdk/client-ses';
import { IMessage } from './messages';

export const sendMail = async (message: IMessage) => {
  const ses = new aws.SES({
    region: 'us-east-2',
  });

  const transporter = createTransport({
    SES: { ses, aws },
  });

  const email = await transporter.sendMail(message);

  console.log(email, 'Email');
};
