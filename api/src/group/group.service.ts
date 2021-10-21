import { Repository } from 'typeorm';

import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ERRORS } from 'src/constants/errors';
import { UserEntity } from 'src/user/entities/user.entity';
import { AssignUsersToGroupDto } from './dto/assign-users-to-group.dto';
import { ChangeGroupDto } from './dto/change-group.dto';
import { CreateGroupDto } from './dto/create-group.dto';
import { GetUserFromTrainerDto } from './dto/get-user-from-trainer.dto ';
import { GroupIdDto } from './dto/group-id.dto';
import { RemoveUsersFromGroupDto } from './dto/remove-users-from-group.dto';
import { GroupEntity } from './entities/group.entity';

import { UNASSIGNED_GROUP } from './group.constants';

@Injectable()
export class GroupService {
  constructor(
    @InjectRepository(GroupEntity)
    private readonly groupRepository: Repository<GroupEntity>,
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>
  ) {}

  async createGroup(body: CreateGroupDto) {
    const trainer = this.userRepository.findOne(body.trainerId);

    if (!trainer) {
      throw new HttpException(ERRORS.notExist, HttpStatus.NOT_FOUND);
    }

    return this.groupRepository.save(body);
  }

  async assignUsersToGroup(body: AssignUsersToGroupDto) {
    const group = await this.groupRepository.findOne(body.groupId, {
      relations: ['users'],
    });

    if (!group) {
      throw new HttpException(ERRORS.notFound, HttpStatus.NOT_FOUND);
    }

    const users = await this.userRepository.findByIds(body.userIds);

    await this.groupRepository.save({
      ...group,
      users: [...(group.users || []), ...users],
    });

    return this.groupRepository.findOne(body.groupId);
  }

  async removeUserFromTrainer(body: GetUserFromTrainerDto) {
    const group = await this.getUserInGroup(body);

    const users = (
      await this.groupRepository.findOne(group.id, { relations: ['users'] })
    ).users;

    await this.groupRepository.save({
      ...group,
      users: [...(users.filter((item) => item.id !== body.userId) || [])],
    });

    return {
      message: 'Success',
    };
  }

  async getUserInGroup(body: GetUserFromTrainerDto) {
    return await this.groupRepository
      .createQueryBuilder('group')
      .leftJoinAndSelect('group.users', 'user')
      .where('group.trainerId = (:trainerId)', {
        trainerId: body.trainerId,
      })
      .andWhere('user.id = (:userId)', {
        userId: body.userId,
      })
      .getOne();
  }

  async changeGroupForUsers(body: ChangeGroupDto) {
    body.userIds.forEach(async (userId) => {
      await this.removeUserFromTrainer({ userId, trainerId: body.trainerId });
    });

    return this.assignUsersToGroup({
      userIds: body.userIds,
      groupId: body.newGroupId,
    });
  }

  async deleteGroup(body: GroupIdDto) {
    const group = await this.groupRepository.findOne(body.groupId, {
      relations: ['users'],
    });

    if (!group) {
      throw new HttpException(ERRORS.notFound, HttpStatus.NOT_FOUND);
    }

    await this.groupRepository.delete(body.groupId);

    const userIds = group.users.map((user) => user.id);

    const unassignedGroup = await this.groupRepository.findOne({
      where: {
        trainerId: group.trainerId,
        name: UNASSIGNED_GROUP,
      },
    });

    await this.assignUsersToGroup({ userIds, groupId: unassignedGroup.id });

    return group;
  }

  async removeUsersFromGroup(body: RemoveUsersFromGroupDto) {
    const unassignedGroup = await this.groupRepository.findOne({
      where: {
        trainerId: body.trainerId,
        name: UNASSIGNED_GROUP,
      },
    });

    await this.changeGroupForUsers({
      userIds: body.userIds,
      newGroupId: unassignedGroup.id,
      trainerId: body.trainerId,
    });

    return {
      message: 'Success',
    };
  }

  async getUsersByGroup(body: { groupId: string }) {
    const group = await this.groupRepository.findOne(body.groupId, {
      relations: ['users'],
    });

    if (!group) {
      throw new HttpException(ERRORS.notFound, HttpStatus.NOT_FOUND);
    }

    return group.users;
  }

  async getGroupsByTrainer(body: { trainerId: string }) {
    return this.groupRepository.find({
      where: {
        trainerId: body.trainerId,
      },
    });
  }

  async getAllGroups() {
    const groups = await this.groupRepository.find();

    return await Promise.all(
      groups.map(async (group) => {
        const trainer = await this.userRepository.findOne(group.trainerId);

        return {
          id: group.id,
          created: group.created,
          name: group.name,
          users: group.users,
          trainer: {
            name: `${trainer.firstName} ${trainer.lastName}`,
            id: trainer.id,
          },
        };
      })
    );
  }
}
