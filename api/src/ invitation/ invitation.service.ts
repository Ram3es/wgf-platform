import { Repository } from 'typeorm';

import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ERRORS } from 'src/constants/errors';
import { EXPIRE_INVITE_TIME } from 'src/constants/etc';
import { ROLES } from 'src/constants/roles';
import { GroupEntity } from 'src/group/entities/group.entity';
import { sendMail } from 'src/shared/utils/email';
import {
    adminToUserMail, studentToTrainerMail, trainerToExistingStudentMail, trainerToStudentMail
} from 'src/shared/utils/messages';
import { UserEntity } from 'src/user/entities/user.entity';
import { UserService } from 'src/user/user.service';
import { GroupService } from '../group/group.service';
import { adminToExistingTrainerMail, adminToTrainerMail } from '../shared/utils/messages';
import { CreateInvitationDto } from './dto/create-invitation.dto';
import { InvitationEntity } from './entities/ invitation.entity';

import { INVITATION_TYPE } from 'src/ invitation/invitation.constants';
import { UNASSIGNED_GROUP } from 'src/group/group.constants';
import { INVITATION_STATUS } from './invitation.constants';

@Injectable()
export class InvitationService {
  constructor(
    @InjectRepository(InvitationEntity)
    private readonly invitationRepository: Repository<InvitationEntity>,
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    @InjectRepository(GroupEntity)
    private readonly groupRepository: Repository<GroupEntity>,
    private readonly groupService: GroupService,
    private readonly userService: UserService
  ) {}

  async inviteStudentFromTrainer(trainerId: string, body: CreateInvitationDto) {
    const email = body.to.toLowerCase();

    const user = await this.userRepository.findOne({
      where: {
        email,
      },
    });

    if (user && user.role !== ROLES.user) {
      throw new HttpException(ERRORS.user.anotherRole, HttpStatus.CONFLICT);
    }

    const userInGroup = await this.groupService.getUserInGroup({
      trainerId,
      userId: user?.id,
    });

    if (userInGroup) {
      throw new HttpException(ERRORS.trainer.alreadyExist, HttpStatus.CONFLICT);
    }

    const trainer = await this.userRepository.findOne(trainerId);

    const isSend = await this.invitationRepository.findOne({
      where: { to: email, from: trainer.id },
    });

    if (
      isSend &&
      new Date().getTime() - new Date(isSend.inviteDate).getTime() <
        EXPIRE_INVITE_TIME &&
      isSend.status === INVITATION_STATUS.pending
    ) {
      throw new HttpException(ERRORS.alreadySentInvite, HttpStatus.FORBIDDEN);
    }

    if (isSend) {
      await this.invitationRepository.delete(isSend.id);
    }

    const group = await this.groupRepository.findOne(body.groupId);

    const invitation = await this.invitationRepository.save({
      ...body,
      from: trainerId,
      to: email,
      group,
    });

    const trainerName = `${trainer.firstName} ${trainer.lastName}`;

    if (!user) {
      sendMail(
        trainerToStudentMail(email, body.name, trainerName, invitation.id)
      );
    } else {
      sendMail(trainerToExistingStudentMail(user, trainerName, invitation.id));
    }

    return invitation;
  }

  async inviteUser(adminId: string, body: CreateInvitationDto) {
    const email = body.to.toLowerCase();

    const user = await this.userRepository.findOne({
      where: {
        email,
      },
    });

    if (user) {
      throw new HttpException(ERRORS.user.alreadyExist, HttpStatus.CONFLICT);
    }

    const admin = await this.userRepository.findOne(adminId);

    const isSend = await this.invitationRepository.findOne({
      where: { to: email, from: admin.id, type: 'user' },
    });

    if (
      isSend &&
      new Date().getTime() - new Date(isSend.inviteDate).getTime() <
        EXPIRE_INVITE_TIME &&
      isSend.status === INVITATION_STATUS.pending
    ) {
      throw new HttpException(ERRORS.alreadySentInvite, HttpStatus.FORBIDDEN);
    }

    if (isSend) {
      await this.invitationRepository.delete(isSend.id);
    }

    const invitation = await this.invitationRepository.save({
      ...body,
      from: adminId,
      to: email,
    });

    const adminName = `${admin.firstName} ${admin.lastName}`;

    sendMail(adminToUserMail(body.to, body.name, adminName, invitation.id));

    return invitation;
  }

  async requestTrainerFromStudent(userId: string, body: CreateInvitationDto) {
    const email = body.to.toLowerCase();

    const trainer = await this.userRepository.findOne({
      where: {
        email,
        role: ROLES.trainerAdmin,
      },
    });

    const student = await this.userRepository.findOne(userId);

    if (!trainer) {
      throw new HttpException(
        ERRORS.student.trainerNotExist,
        HttpStatus.NOT_FOUND
      );
    }

    const userInGroup = await this.groupService.getUserInGroup({
      trainerId: trainer.id,
      userId: student.id,
    });

    if (userInGroup) {
      throw new HttpException(ERRORS.student.alreadyExist, HttpStatus.CONFLICT);
    }

    const isSend = await this.invitationRepository.findOne({
      where: { to: email, from: student.id },
    });

    if (
      isSend &&
      new Date().getTime() - new Date(isSend.inviteDate).getTime() <
        EXPIRE_INVITE_TIME &&
      isSend.status === INVITATION_STATUS.pending
    ) {
      throw new HttpException(ERRORS.alreadySentInvite, HttpStatus.FORBIDDEN);
    }

    if (isSend) {
      await this.invitationRepository.delete(isSend.id);
    }

    const studentName = `${student.firstName} ${student.lastName}`;

    const invitation = await this.invitationRepository.save({
      ...body,
      to: email,
      from: userId,
    });

    sendMail(studentToTrainerMail(trainer, studentName, invitation.id));

    return invitation;
  }

  async acceptInvitationTrainerToStudent(body: { token: string }) {
    const invitation = await this.invitationRepository.findOne(body.token, {
      relations: ['group'],
    });

    if (!invitation) {
      throw new HttpException(ERRORS.linkExpired, HttpStatus.UNAUTHORIZED);
    }

    const user = await this.userRepository.findOne({
      where: {
        email: invitation.to,
      },
    });

    if (!user) {
      throw new HttpException(ERRORS.notExist, HttpStatus.NOT_FOUND);
    }

    await this.invitationRepository.save({
      ...invitation,
      status: INVITATION_STATUS.accepted,
    });

    const payload = {
      groupId: invitation.group.id,
      userIds: [user.id],
    };

    await this.groupService.assignUsersToGroup(payload);

    return {
      message: 'Success',
    };
  }

  async acceptRequestTrainer(body: { token: string }) {
    const invitation = await this.invitationRepository.findOne(body.token);

    if (!invitation) {
      throw new HttpException(ERRORS.linkExpired, HttpStatus.UNAUTHORIZED);
    }

    const student = await this.userRepository.findOne(invitation.from);

    const trainer = await this.userRepository.findOne({
      where: {
        email: invitation.to,
      },
    });

    if (!student || !trainer) {
      throw new HttpException(ERRORS.notExist, HttpStatus.NOT_FOUND);
    }

    await this.invitationRepository.save({
      ...invitation,
      status: INVITATION_STATUS.accepted,
    });

    const unassignedGroup = await this.groupRepository.findOne({
      where: {
        trainerId: trainer.id,
        name: UNASSIGNED_GROUP,
      },
    });

    const payload = {
      groupId: unassignedGroup.id,
      userIds: [student.id],
    };

    await this.groupService.assignUsersToGroup(payload);

    return {
      message: 'Success',
    };
  }

  async approveAllTrainerRequests(id: string) {
    const trainer = await this.userService.getUserById(id);

    const requests = await this.invitationRepository.find({
      where: {
        to: trainer.email,
        type: INVITATION_TYPE.student,
        status: INVITATION_STATUS.pending,
      },
    });

    requests.forEach(async (request) => {
      await this.acceptRequestTrainer({ token: request.id });
    });

    return {
      message: 'Success',
    };
  }

  async acceptInvitationExistingTrainer(body: { token: string }) {
    const invitation = await this.invitationRepository.findOne(body.token);

    if (!invitation) {
      throw new HttpException(ERRORS.linkExpired, HttpStatus.UNAUTHORIZED);
    }

    await this.userService.createTrainerAdmin({ email: invitation.to });

    await this.invitationRepository.save({
      ...invitation,
      status: INVITATION_STATUS.accepted,
    });

    return {
      message: 'Success',
    };
  }

  async acceptInvitationNotExistUser(body: { token: string }) {
    const invitation = await this.invitationRepository.findOne(body.token);

    if (!invitation) {
      throw new HttpException(ERRORS.linkExpired, HttpStatus.UNAUTHORIZED);
    }

    await this.invitationRepository.save({
      ...invitation,
      status: INVITATION_STATUS.registrationPending,
    });

    return {
      message: 'Success',
    };
  }

  async inviteTrainer(superAdminId: string, body: CreateInvitationDto) {
    const email = body.to.toLowerCase();

    const trainer = await this.userRepository.findOne({
      where: {
        email,
      },
    });

    const isSend = await this.invitationRepository.findOne({
      where: { to: email, from: superAdminId, type: 'trainer' },
    });

    if (
      isSend &&
      new Date().getTime() - new Date(isSend.inviteDate).getTime() <
        EXPIRE_INVITE_TIME &&
      isSend.status === INVITATION_STATUS.pending
    ) {
      throw new HttpException(ERRORS.alreadySentInvite, HttpStatus.FORBIDDEN);
    }

    if (isSend) {
      await this.invitationRepository.delete(isSend.id);
    }

    const invitation = await this.invitationRepository.save({
      name: body.name,
      from: superAdminId,
      type: body.type,
      to: email,
    });

    const superAdmin = await this.userRepository.findOne(superAdminId);

    const superAdminName = `${superAdmin.firstName} ${superAdmin.lastName}`;

    if (!trainer) {
      sendMail(
        adminToTrainerMail(email, body.name, superAdminName, invitation.id)
      );
    } else {
      sendMail(
        adminToExistingTrainerMail(trainer, superAdminName, invitation.id)
      );
    }

    return invitation;
  }

  async getInvitations(id: string) {
    const invitations = await this.invitationRepository.find({
      where: {
        from: id,
      },
    });

    return await Promise.all(
      invitations.map(async (item) => {
        const user = await this.userRepository.findOne({
          where: {
            email: item.to,
          },
        });

        return {
          ...item,
          registeredOn: user.created || 'Pending',
          name: user ? `${user.firstName} ${user.lastName}` : item.name,
        };
      })
    );
  }

  async deleteInvitations(body: { invitationIds: string[] }) {
    body.invitationIds.forEach(async (invitationId) => {
      await this.invitationRepository.delete(invitationId);
    });
    return {
      message: 'Success',
    };
  }
}
