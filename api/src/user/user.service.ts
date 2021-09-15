import * as bcrypt from 'bcrypt';
import { deserialize, serialize } from 'class-transformer';
import { Repository } from 'typeorm';

import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { ERRORS } from 'src/constants/errors';
import { EXPIRE_JWT_TIME } from 'src/constants/etc';
import { ROLES } from 'src/constants/roles';
import { sendMail } from 'src/services/utils/email';
import { registrationMessage } from 'src/services/utils/messages';
import { CreateTrainerAdminDto } from './dto/create-trainer-admin.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { SignInDto } from './dto/sign-in.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserIdDto } from './dto/user-by-id.dto';
import { UserEntity } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    private jwtService: JwtService,
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private configService: ConfigService
  ) {}

  async createToken(user: UserEntity) {
    const expiresIn = EXPIRE_JWT_TIME + Date.now();
    const data = { id: user.id, expiresIn, role: user.role };
    const secret = await this.createSecretString(user.publicKey);
    return this.jwtService.sign(data, { secret });
  }

  private async createSecretString(personalKey: string) {
    const secret = await this.configService.get('JWT_SECRET');
    console.log(secret);
    return `${secret}${personalKey}`;
  }

  async signUp(body: CreateUserDto) {
    const email = body.email.toLowerCase();

    const user = await this.userRepository.findOne({
      where: { email: email },
    });
    if (user) {
      throw new HttpException(ERRORS.alreadyExist, HttpStatus.CONFLICT);
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

    sendMail({ ...newUser, password: body.password }, registrationMessage);

    return { user: await this.userSerializer(newUser), token };
  }

  async signIn(data: SignInDto) {
    const { email, password } = data;
    const user = await this.userRepository.findOne({
      where: { email },
    });

    if (!user) {
      throw new HttpException(ERRORS.notExist, HttpStatus.NOT_FOUND);
    }

    if (!(await bcrypt.compare(password, user.password))) {
      throw new HttpException(ERRORS.loginError, HttpStatus.BAD_REQUEST);
    }

    return {
      user: await this.userSerializer(user),
      token: await this.createToken(user),
    };
  }

  async logOut(id: string) {
    const user = await this.userRepository.findOne({
      where: {
        id,
      },
    });
    if (!user) {
      throw new HttpException(ERRORS.notFound, HttpStatus.NOT_FOUND);
    }

    const publicKey = await bcrypt.genSalt(6);

    await this.userRepository.update(user.id, {
      publicKey,
    });

    return {
      message: 'Success',
    };
  }

  async getUserById(id: string) {
    const user = await this.userRepository.findOne(id);
    if (!user) {
      throw new HttpException(ERRORS.notFound, HttpStatus.NOT_FOUND);
    }
    return user;
  }

  async userSerializer(user: UserEntity) {
    const serializedUser = serialize(user);
    return deserialize(UserEntity, serializedUser);
  }

  async createTrainerAdmin(body: CreateTrainerAdminDto) {
    if (!body.email) {
      throw new HttpException(ERRORS.notExist, HttpStatus.BAD_REQUEST);
    }

    const user = await this.userRepository.findOne({
      where: {
        email: body.email,
      },
    });

    return this.updateUser({
      ...user,
      role: ROLES.trainerAdmin,
    });
  }

  async updateUser(body: UpdateUserDto) {
    const user = await this.getUserById(body.id);

    if (!user) {
      throw new HttpException(ERRORS.notExist, HttpStatus.NOT_FOUND);
    }

    await this.userRepository.save({
      ...body,
      email: body.email ? body.email.toLowerCase() : user.email,
    });

    return this.getUserById(user.id);
  }

  async addUsersTrainer(trainerAdminId: string, body: UserIdDto) {
    const user = await this.getUserById(body.userId);
    return this.updateUser({ ...user, trainerAdminId });
  }
}
