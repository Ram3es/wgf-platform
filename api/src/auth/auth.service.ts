import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';

import { HttpService } from '@nestjs/axios';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { InvitationEntity } from 'src/ invitation/entities/ invitation.entity';
import { ERRORS } from 'src/constants/errors';
import { EXPIRE_JWT_TIME } from 'src/constants/etc';
import { sendMail } from 'src/shared/utils/email';
import { registrationMessage } from 'src/shared/utils/messages';
import { UserEntity } from 'src/user/entities/user.entity';
import { UserService } from 'src/user/user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { SignInDto } from './dto/sign-in.dto';
import { SocialLoginDto } from './dto/social-login.dto';

import { INVITATION_STATUS } from 'src/ invitation/invitation.constants';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    @InjectRepository(InvitationEntity)
    private readonly invitationRepository: Repository<InvitationEntity>,
    private configService: ConfigService,
    private userService: UserService,
    private readonly httpService: HttpService
  ) {}

  async createToken(user: UserEntity) {
    const expiresIn = EXPIRE_JWT_TIME + Date.now();
    const data = { id: user.id, expiresIn, role: user.role };
    const secret = await this.createSecretString(user.publicKey);
    return this.jwtService.sign(data, { secret });
  }

  private async createSecretString(personalKey: string) {
    const secret = await this.configService.get('JWT_SECRET');

    return `${secret}${personalKey}`;
  }

  async signUp(body: CreateUserDto) {
    const email = body.email.toLowerCase();

    const user = await this.userRepository.findOne({
      where: { email: email },
    });
    if (user) {
      throw new HttpException(ERRORS.user.alreadyExist, HttpStatus.CONFLICT);
    }
    const publicKey = await bcrypt.genSalt(6);
    const newPassword = await bcrypt.hash(body.password, 10);

    const newUser = await this.userRepository.save({
      ...body,
      email,
      publicKey,
      password: newPassword,
    });

    const token = await this.createToken(newUser);

    const payload = registrationMessage(newUser);

    sendMail(payload);

    const invitation = await this.invitationRepository.findOne({
      where: {
        to: email,
      },
      relations: ['group'],
    });

    if (invitation?.status === INVITATION_STATUS.registrationPending) {
      await this.userService.acceptInvitation(invitation, newUser);

      const updatedUser = await this.userService.getUserById(newUser.id);

      const token = await this.createToken(updatedUser);

      return {
        user: await this.userService.userSerializer(updatedUser),
        token,
      };
    }

    return { user: await this.userService.userSerializer(newUser), token };
  }

  async signIn(data: SignInDto) {
    const { email, password } = data;
    const user = await this.userRepository.findOne({
      where: { email },
    });

    if (!user) {
      throw new HttpException(ERRORS.user.notExist, HttpStatus.NOT_FOUND);
    }

    if (!user.password || !(await bcrypt.compare(password, user.password))) {
      throw new HttpException(ERRORS.user.loginError, HttpStatus.BAD_REQUEST);
    }

    const publicKey = await bcrypt.genSalt(6);

    await this.userRepository.update(user.id, {
      publicKey,
    });

    const newUser = await this.userService.getUserById(user.id);

    return {
      user: await this.userService.userSerializer(newUser),
      token: await this.createToken(newUser),
    };
  }

  async logOut(id: string) {
    const user = await this.userRepository.findOne({
      where: {
        id,
      },
    });
    if (!user) {
      throw new HttpException(ERRORS.user.notExist, HttpStatus.NOT_FOUND);
    }

    const publicKey = await bcrypt.genSalt(6);

    await this.userRepository.update(user.id, {
      publicKey,
    });

    return {
      message: 'Success',
    };
  }

  async socialLogIn(body: SocialLoginDto) {
    const { email } = body;

    const user = await this.userRepository.findOne({
      where: {
        email,
      },
    });

    const publicKey = await bcrypt.genSalt(6);

    if (user) {
      await this.userRepository.update(user.id, {
        publicKey,
      });

      const newUser = await this.userService.getUserById(user.id);

      return {
        user: await this.userService.userSerializer(newUser),
        token: await this.createToken(newUser),
      };
    }

    let imageBase64: string;

    if (body.avatar) {
      const image = await this.httpService
        .get(body.avatar, { responseType: 'arraybuffer' })
        .toPromise();
      imageBase64 =
        'data:image/jpeg;base64,' + Buffer.from(image.data).toString('base64');
    }

    const newUser = await this.userRepository.save({
      ...body,
      publicKey,
      avatar: imageBase64,
    });

    const payload = registrationMessage(newUser);

    sendMail(payload);

    const invitation = await this.invitationRepository.findOne({
      where: {
        to: email,
      },
      relations: ['group'],
    });

    if (invitation?.status === INVITATION_STATUS.registrationPending) {
      await this.userService.acceptInvitation(invitation, newUser);

      const updatedUser = await this.userService.getUserById(newUser.id);

      const token = await this.createToken(updatedUser);

      return {
        user: await this.userService.userSerializer(updatedUser),
        token,
      };
    }

    return {
      user: await this.userService.userSerializer(newUser),
      token: await this.createToken(newUser),
    };
  }
}
