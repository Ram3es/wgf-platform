import { createTransport } from 'nodemailer';

import * as aws from '@aws-sdk/client-ses';
import { UserEntity } from 'src/user/entities/user.entity';
import { IMessage } from './messages';

export const sendMail = async (
  user: UserEntity,
  mail: (user: UserEntity, atattachment?: string) => IMessage,
  attachment?: string
) => {
  const ses = new aws.SES({
    region: 'us-east-2',
  });

  const transporter = createTransport({
    SES: { ses, aws },
  });

  const message = mail(user, attachment);

  await transporter.sendMail(message);
};
