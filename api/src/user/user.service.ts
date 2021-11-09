import * as bcrypt from 'bcrypt';
import { deserialize, serialize } from 'class-transformer';
import { Repository } from 'typeorm';
import { v4 as uuid } from 'uuid';

import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { InvitationEntity } from 'src/ invitation/entities/ invitation.entity';
import { ERRORS } from 'src/constants/errors';
import { EXPIRE_JWT_TIME, EXPIRE_LINK_TIME } from 'src/constants/etc';
import { ROLES } from 'src/constants/roles';
import { sendMail } from 'src/shared/utils/email';
import { createPasswordMail, registrationMessage } from 'src/shared/utils/messages';
import { GroupService } from '../group/group.service';
import { CreateTrainerAdminDto } from './dto/create-trainer-admin.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { ResetPassWordDTO } from './dto/reset-password.dto';
import { SignInDto } from './dto/sign-in.dto';
import { UpdatePassWordDTO } from './dto/update-password.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserIdDto } from './dto/user-by-id.dto';
import { ResetPasswordEntity } from './entities/reset-password.entity';
import { UserEntity } from './entities/user.entity';

import { INVITATION_STATUS, INVITATION_TYPE } from 'src/ invitation/invitation.constants';
import { UNASSIGNED_GROUP } from 'src/group/group.constants';

@Injectable()
export class UserService {
  constructor(
    private jwtService: JwtService,
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    @InjectRepository(InvitationEntity)
    private readonly invitationRepository: Repository<InvitationEntity>,
    @InjectRepository(ResetPasswordEntity)
    private readonly resetPasswordRepository: Repository<ResetPasswordEntity>,
    private configService: ConfigService,
    private groupService: GroupService
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
      await this.acceptInvitation(invitation, newUser);

      const updatedUser = await this.getUserById(newUser.id);

      const token = await this.createToken(updatedUser);

      return { user: await this.userSerializer(updatedUser), token };
    }

    return { user: await this.userSerializer(newUser), token };
  }

  async signIn(data: SignInDto) {
    const { email, password } = data;
    const user = await this.userRepository.findOne({
      where: { email },
    });

    if (!user) {
      throw new HttpException(ERRORS.user.notExist, HttpStatus.NOT_FOUND);
    }

    if (!(await bcrypt.compare(password, user.password))) {
      throw new HttpException(ERRORS.user.loginError, HttpStatus.BAD_REQUEST);
    }

    const publicKey = await bcrypt.genSalt(6);

    await this.userRepository.update(user.id, {
      publicKey,
    });

    const newUser = await this.getUserById(user.id);

    return {
      user: await this.userSerializer(newUser),
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

  async getUserById(id: string) {
    const user = await this.userRepository.findOne(id);

    if (!user) {
      throw new HttpException(ERRORS.user.notExist, HttpStatus.NOT_FOUND);
    }
    return user;
  }

  async userSerializer(user: UserEntity) {
    const serializedUser = serialize(user);
    return deserialize(UserEntity, serializedUser);
  }

  async updateUser(body: UpdateUserDto) {
    const user = await this.getUserById(body.id);

    const email = body.email ? body.email.toLowerCase() : null;

    if (email && email !== user.email) {
      const userByEmail = await this.userRepository.findOne({
        where: {
          email,
        },
      });

      if (userByEmail) {
        throw new HttpException(ERRORS.user.alreadyExist, HttpStatus.CONFLICT);
      }
    }

    if (!user) {
      throw new HttpException(ERRORS.user.notExist, HttpStatus.NOT_FOUND);
    }

    await this.userRepository.save({
      ...body,
      email: body.email ? body.email.toLowerCase() : user.email,
    });

    return this.getUserById(user.id);
  }

  async updatePasswordRequest(body: { email: string }) {
    const { email } = body;
    const isSend = await this.resetPasswordRepository.findOne({
      where: { email: email.toLowerCase() },
    });

    if (isSend) {
      await this.resetPasswordRepository.delete(isSend.id);
    }

    const user = await this.userRepository.findOne({
      where: {
        email,
      },
    });

    if (!user) {
      throw new HttpException(ERRORS.user.notExist, HttpStatus.BAD_REQUEST);
    }

    const token = uuid();
    await this.resetPasswordRepository.save({
      email,
      token,
    });

    const payload = createPasswordMail(user, token);
    sendMail(payload);

    return {
      message: 'Success',
    };
  }

  async updateProfilePassword(id: string, body: UpdatePassWordDTO) {
    const user = await this.getUserById(id);

    if (!(await bcrypt.compare(body.password, user.password))) {
      throw new HttpException(ERRORS.user.wrongPassword, HttpStatus.FORBIDDEN);
    }

    const newPassword = await bcrypt.hash(body.newPassword, 10);
    await this.userRepository.update(user.id, {
      password: newPassword,
    });

    return {
      message: 'Success',
    };
  }

  async updateResetedPassword(body: ResetPassWordDTO) {
    const resetPassModel = await this.resetPasswordRepository.findOne({
      where: { token: body.token },
    });

    if (!resetPassModel) {
      throw new HttpException(ERRORS.linkExpired, HttpStatus.UNAUTHORIZED);
    }

    const user = await this.userRepository.findOne({
      where: { email: resetPassModel.email },
    });

    if (!user) {
      throw new HttpException(ERRORS.user.notExist, HttpStatus.NOT_FOUND);
    }

    if (
      new Date().getTime() - new Date(resetPassModel.created).getTime() >
      EXPIRE_LINK_TIME
    ) {
      await this.resetPasswordRepository.delete(resetPassModel.id);
      throw new HttpException(ERRORS.linkExpired, HttpStatus.BAD_REQUEST);
    }

    const newPassword = await bcrypt.hash(body.newPassword, 10);
    await this.userRepository.update(user.id, {
      password: newPassword,
    });

    await this.resetPasswordRepository.delete(resetPassModel.id);

    return {
      message: 'Success',
    };
  }

  async createTrainerAdmin(body: CreateTrainerAdminDto) {
    const user = await this.userRepository.findOne({
      where: {
        email: body.email,
      },
    });

    await this.updateUser({
      ...user,
      role: ROLES.trainerAdmin,
    });

    await this.groupService.createGroup({
      name: UNASSIGNED_GROUP,
      trainerId: user.id,
    });

    return {
      message: 'Success',
    };
  }

  async acceptInvitation(invitation: InvitationEntity, user: UserEntity) {
    switch (invitation.type) {
      case INVITATION_TYPE.trainer:
        await this.createTrainerAdmin({ email: user.email });
        await this.invitationRepository.update(invitation.id, {
          status: INVITATION_STATUS.accepted,
        });
        break;
      case INVITATION_TYPE.student:
        await this.groupService.assignUsersToGroup({
          groupId: invitation.group.id,
          userIds: [user.id],
        });
        await this.invitationRepository.update(invitation.id, {
          status: INVITATION_STATUS.accepted,
        });
        break;
      default:
        await this.invitationRepository.update(invitation.id, {
          status: INVITATION_STATUS.accepted,
        });
        break;
    }
  }

  async getUsersByTrainer(trainerId: string) {
    return this.userRepository
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.results', 'result')
      .leftJoinAndSelect('result.quiz', 'quiz')
      .leftJoinAndSelect('user.groups', 'group')
      .where('group.trainerId = (:trainerId)', {
        trainerId,
      })
      .select([
        'user.id',
        'user.firstName',
        'user.lastName',
        'user.email',
        'user.created',
        'group.name',
        'group.id',
        'result.status',
        'result.updated',
        'quiz.title',
      ])
      .getMany();
  }

  async getAllUsers() {
    return this.userRepository
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.results', 'result')
      .leftJoinAndSelect('result.quiz', 'quiz')
      .leftJoinAndSelect('user.groups', 'group')
      .select([
        'user.id',
        'user.firstName',
        'user.lastName',
        'user.email',
        'user.created',
        'group.name',
        'result.status',
        'result.updated',
        'quiz.title',
      ])
      .getMany();
  }

  async getAllTrainers() {
    return this.userRepository.find({
      where: {
        role: ROLES.trainerAdmin,
      },
    });
  }

  async getTrainersByUser(id: string) {
    const user = await this.userRepository
      .createQueryBuilder('user')
      .where('user.id = (:id)', {
        id,
      })
      .leftJoinAndSelect('user.groups', 'group')
      .getOne();

    return Promise.all(
      user.groups.map(async (item) => {
        const { organizationName, lastName, firstName, email, avatar, id } =
          await this.getUserById(item.trainerId);

        return {
          groupName: item.name,
          groupId: item.id,
          id,
          firstName,
          lastName,
          email,
          organizationName,
          avatar,
        };
      })
    );
  }

  async deleteUser(body: UserIdDto) {
    const user = await this.getUserById(body.userId);

    await this.userRepository.delete(user.id);

    return user;
  }

  async deleteTrainer(body: UserIdDto) {
    const trainer = await this.getUserById(body.userId);

    await this.userRepository.delete(trainer.id);
    const groups = await this.groupService.getGroupsByTrainer({
      trainerId: trainer.id,
    });

    groups.forEach(async (group) => {
      await this.groupService.deleteGroup({ groupId: group.id });
    });

    return trainer;
  }
}
