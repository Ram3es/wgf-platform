import { Repository } from 'typeorm';

import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ERRORS } from 'src/constants/errors';
import { sendMail } from 'src/shared/utils/email';
import { UserEntity } from 'src/user/entities/user.entity';
import { EXPIRE_CODE_CHANGE_EMAIL_TIME } from '../constants/etc';
import { emailVerificationMail } from '../shared/utils/messages';
import { VerificationEntity } from './entities/verification.entity';

@Injectable()
export class VerificationService {
  constructor(
    @InjectRepository(VerificationEntity)
    private readonly verificationRepository: Repository<VerificationEntity>,
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>
  ) {}

  async sendCode(body: { email: string; userName: string }) {
    const email = body.email.toLowerCase();
    const user = await this.userRepository.findOne({
      where: { email },
    });
    if (user) {
      throw new HttpException(ERRORS.emailUsed, HttpStatus.CONFLICT);
    }
    const generateEmailSecret = () => {
      return Math.floor(100000 + Math.random() * 900000);
    };
    const emailSecret = generateEmailSecret();
    const alreadySentCode = await this.verificationRepository.findOne({
      where: { email },
    });
    if (alreadySentCode) {
      await this.verificationRepository.delete(alreadySentCode.id);
    }
    await this.verificationRepository.save({
      email,
      secret: emailSecret,
    });

    await sendMail(emailVerificationMail(email, body.userName, emailSecret));
    return {
      message: 'Success',
    };
  }

  async verifyCode(id: string, body: { codeToSend: number; newEmail: string }) {
    const email = body.newEmail.toLowerCase();
    const rightCode = await this.verificationRepository.findOne({
      where: { email },
    });
    if (!rightCode) {
      throw new HttpException(ERRORS.notExist, HttpStatus.NOT_FOUND);
    }
    if (
      new Date().getTime() - new Date(rightCode.created).getTime() >
      EXPIRE_CODE_CHANGE_EMAIL_TIME
    ) {
      await this.verificationRepository.delete(rightCode.id);
      throw new HttpException(ERRORS.codeExpired, HttpStatus.BAD_REQUEST);
    }

    if (rightCode.secret === body.codeToSend) {
      await this.userRepository.update(id, { email });
      await this.verificationRepository.delete(rightCode.id);
    } else {
      await this.verificationRepository.delete(rightCode.id);
      throw new HttpException(ERRORS.wrongCode, HttpStatus.CONFLICT);
    }
    return {
      message: 'Success',
    };
  }
}
