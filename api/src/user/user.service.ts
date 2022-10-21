import * as bcrypt from 'bcrypt';
import { deserialize, serialize } from 'class-transformer';
import { Repository } from 'typeorm';
import { v4 as uuid } from 'uuid';

import {
  forwardRef,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { InvitationEntity } from 'src/ invitation/entities/ invitation.entity';
import { ERRORS } from 'src/constants/errors';
import { EXPIRE_LINK_TIME } from 'src/constants/etc';
import { ROLES } from 'src/constants/roles';
import { GroupEntity } from 'src/group/entities/group.entity';
import { sendMail } from 'src/shared/utils/email';
import {
  adminChangedRole,
  resetPasswordMail,
  userWasRegistered,
} from 'src/shared/utils/messages';
import { AuthService } from '../auth/auth.service';
import { GroupService } from '../group/group.service';
import {
  createCsvTrainers,
  createCsvUsers,
  ITrainerCsv,
  IUserCsv,
} from '../shared/utils/csv-format';
import { CreateTrainerAdminDto } from './dto/create-trainer-admin.dto';
import { ResetPassWordDTO } from './dto/reset-password.dto';
import { UpdatePassWordDTO } from './dto/update-password.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserIdDto } from './dto/user-by-id.dto';
import { ResetPasswordEntity } from './entities/reset-password.entity';
import { UserEntity } from './entities/user.entity';

import {
  INVITATION_STATUS,
  INVITATION_TYPE,
} from 'src/ invitation/invitation.constants';
import { UNASSIGNED_GROUP } from 'src/group/group.constants';
import { UpdateRolesDTO } from './dto/update-role.dto';

@Injectable()
export class UserService {
  constructor(
    private jwtService: JwtService,
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    @InjectRepository(GroupEntity)
    private readonly groupRepository: Repository<GroupEntity>,
    @InjectRepository(InvitationEntity)
    private readonly invitationRepository: Repository<InvitationEntity>,
    @InjectRepository(ResetPasswordEntity)
    private readonly resetPasswordRepository: Repository<ResetPasswordEntity>,
    private configService: ConfigService,
    private groupService: GroupService,
    @Inject(forwardRef(() => AuthService))
    private authService: AuthService
  ) {}

  async getUserById(id: string) {
    const user = await this.userRepository.findOne(id);

    if (!user) {
      throw new HttpException(ERRORS.user.notExist, HttpStatus.NOT_FOUND);
    }
    return user;
  }
  async getUserByIdWithResult(id: string) {
    const user = await this.userRepository
      .createQueryBuilder('user')
      .where({ id })
      .leftJoinAndSelect('user.results', 'result')
      .leftJoinAndSelect('result.quiz', 'quiz')
      .leftJoinAndSelect('user.groups', 'group')
      .getOne();

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

    const payload = resetPasswordMail(user, token);
    sendMail(payload);

    return {
      message: 'Success',
    };
  }

  async updateProfilePassword(id: string, body: UpdatePassWordDTO) {
    const user = await this.getUserById(id);
    if (!user.password) {
      throw new HttpException(
        ERRORS.user.loggedInBySocials,
        HttpStatus.FORBIDDEN
      );
    }
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

    const updatedUser = await this.getUserById(user.id);

    const userToken = await this.authService.createToken(updatedUser);

    return {
      user: await this.userSerializer(updatedUser),
      token: userToken,
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

    const group = await this.groupRepository.findOne({
      where: {
        name: UNASSIGNED_GROUP,
        trainerId: user.id,
      },
    });

    if (group) {
      return {
        message: 'Success',
      };
    }

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
    const adminInitiator = await this.userRepository.findOne({
      where: { id: invitation.from },
    });
    const payload = userWasRegistered(user, adminInitiator);
    sendMail(payload);
  }

  async getUsersByTrainer(trainerId: string) {
    const existingStudents = await this.userRepository
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
        'user.role',
        'user.email',
        'user.created',
        'group.name',
        'group.trainerId',
        'result.status',
        'result.created',
        'quiz.title',
      ])
      .getMany();

    const invitedUsersByTrainer = await this.invitationRepository
      .createQueryBuilder('invitation')
      .where('invitation.type IN (:...types)', {
        types: [INVITATION_TYPE.student],
      })
      .andWhere('invitation.from = (:from)', {
        from: trainerId,
      })
      .andWhere('invitation.status IN (:...statuses)', {
        statuses: [
          INVITATION_STATUS.pending,
          INVITATION_STATUS.registrationPending,
        ],
      })
      .leftJoinAndSelect('invitation.group', 'group')
      .getMany();
    return [...existingStudents, ...invitedUsersByTrainer];
  }

  async getAllUsers() {
    const users = await this.userRepository
      .createQueryBuilder('user')
      .where('user.role = (:role)', {
        role: ROLES.user,
      })
      .leftJoinAndSelect('user.results', 'result')
      .leftJoinAndSelect('user.groups', 'group')
      .orderBy('group.name')
      .leftJoinAndSelect('result.quiz', 'quiz')
      .select([
        'user.id',
        'user.firstName',
        'user.lastName',
        'user.role',
        'user.email',
        'user.created',
        'group.name',
        'group.trainerId',
        'result.status',
        'result.created',
        'quiz.title',
      ])
      .getMany();

    const existingUsers = await Promise.all(
      users.map(async (user) => {
        if (!user.groups.length) {
          return user;
        }
        const groups = await Promise.all(
          user.groups.map(async (group) => {
            const trainer = await this.getUserById(group.trainerId);
            return {
              ...group,
              trainerName: `${trainer.firstName} ${trainer.lastName}`,
            };
          })
        );
        return { ...user, groups };
      })
    );

    const invitedUsers = await this.invitationRepository
      .createQueryBuilder('invitation')
      .where('invitation.type IN (:...types)', {
        types: [INVITATION_TYPE.student, INVITATION_TYPE.user],
      })
      .andWhere('invitation.status IN (:...statuses)', {
        statuses: [
          INVITATION_STATUS.pending,
          INVITATION_STATUS.registrationPending,
        ],
      })
      .leftJoinAndSelect('invitation.group', 'group')
      .getMany();

    const asyncFilterexcludeAcceptedInvite = async (arr, predicate) => {
      const result = await Promise.all(arr.map(predicate));
      return arr.filter((item, idx) => result[idx]);
    };

    const excludeAcceptedInvite = await asyncFilterexcludeAcceptedInvite(
      invitedUsers,
      async (invite) => {
        if (!invite.group) {
          const alreadyAccepted = await this.invitationRepository.findOne({
            where: {
              to: invite.to,
              status: INVITATION_STATUS.accepted,
            },
          });
          return !alreadyAccepted;
        } else {
          return true;
        }
      }
    );

    const invitedUsersWithGroups = await Promise.all(
      excludeAcceptedInvite.map(async (invite) => {
        if (!invite.group) {
          return invite;
        }
        const trainer = await this.getUserById(invite.group.trainerId);
        const group = {
          ...invite.group,
          trainerName: `${trainer.firstName} ${trainer.lastName}`,
        };
        return { ...invite, group };
      })
    );
    return [...existingUsers, ...invitedUsersWithGroups];
  }

  async getAllTrainers() {
    const trainers = await this.userRepository
      .createQueryBuilder('trainer')
      .where('trainer.role = (:role)', { role: ROLES.trainerAdmin })
      .select([
        'trainer.id as id',
        'trainer.role as role',
        'trainer.organizationName as organization',
        'trainer.email as email',
        'CONCAT(trainer.firstName,\' \',trainer."lastName") as name',
        'trainer.created as created',
        'trainer.avatar as avatar',
      ])
      .getRawMany();

    const invitedTrainers = await this.invitationRepository
      .createQueryBuilder('invitation')
      .where('invitation.type IN (:...types)', {
        types: [INVITATION_TYPE.requestTrainer, INVITATION_TYPE.trainer],
      })
      .andWhere('invitation.status IN (:...statuses)', {
        statuses: [
          INVITATION_STATUS.pending,
          INVITATION_STATUS.registrationPending,
        ],
      })
      .select([
        'invitation.id as id',
        'invitation.to as email',
        'invitation.status as status',
        'invitation.name as name',
        'invitation.inviteDate as "inviteDate"',
      ])
      .getRawMany();
    return [...trainers, ...invitedTrainers];
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

    await Promise.all(
      groups.map(async (group) => {
        await this.groupService.deleteGroup({ groupId: group.id });
      })
    );

    return trainer;
  }

  async getAllUsersCsv() {
    const users = await this.getAllUsers();
    return {
      file: await createCsvUsers(users as IUserCsv[]),
    };
  }
  async getAllTrainersCsv() {
    const trainers = await this.getAllTrainers();

    return { file: await createCsvTrainers(trainers as ITrainerCsv[]) };
  }

  async getAllStudentsByTrainerCsv(id: string) {
    const users = await this.getUsersByTrainer(id);
    return {
      file: await createCsvUsers(users as IUserCsv[]),
    };
  }

  async getUserHasPassword(id: string) {
    const user = await this.userRepository.findOne(id);
    if (!user) {
      throw new HttpException(ERRORS.user.notExist, HttpStatus.NOT_FOUND);
    }
    return Boolean(user.password);
  }
  async getUserByEmail(payload: string) {
    const email = payload.toLowerCase();
    return this.userRepository.findOne({ where: { email } });
  }

  async changeRole(body: UpdateRolesDTO) {
    const user = await this.userRepository.findOne(body.id);
    if (!user) {
      throw new HttpException(ERRORS.user.notExist, HttpStatus.NOT_FOUND);
    }

    if (user.role === ROLES.trainerAdmin) {
      const groups = await this.groupRepository.find({
        where: { trainerId: body.id },
      });
      groups.length &&
        (await Promise.all(
          groups.map(
            async (group) => await this.groupRepository.delete(group.id)
          )
        ));
    }
    if (user.role === ROLES.user) {
      await this.createTrainerAdmin({ email: user.email });
    }
    await this.userRepository.save({ ...user, role: body.role });

    const userName = `${user.firstName} ${user.lastName}`;
    sendMail(adminChangedRole(user.email, userName, body.role));

    return { status: 'Success' };
  }
}
