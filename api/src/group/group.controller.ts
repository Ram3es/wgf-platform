import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import JwtAuthenticationGuard from 'src/shared/guards/auth.guard';
import { RoleGuard } from 'src/shared/guards/role.guard';
import { AssignUsersToGroupDto } from './dto/assign-users-to-group.dto';
import { ChangeGroupDto } from './dto/change-group.dto';
import { CreateGroupDto } from './dto/create-group.dto';
import { GetByTrainerDto } from './dto/get-by-trainer.dto';
import { GetUserFromTrainerDto } from './dto/get-user-from-trainer.dto ';
import { GroupIdDto } from './dto/group-id.dto';
import { RemoveUsersFromGroupDto } from './dto/remove-users-from-group.dto';
import { GroupEntity } from './entities/group.entity';
import { GroupService } from './group.service';

import { QUESTION_ROUTES } from 'src/question/question.constants';
import { GROUP_ROUTES } from './group.constants';

@ApiTags(GROUP_ROUTES.main)
@Controller(GROUP_ROUTES.main)
export class GroupController {
  constructor(private readonly groupService: GroupService) {}

  @Post(GROUP_ROUTES.create)
  @ApiOperation({ summary: QUESTION_ROUTES.create })
  @ApiResponse({
    status: HttpStatus.OK,
    description: QUESTION_ROUTES.create,
    type: GroupEntity,
  })
  @HttpCode(HttpStatus.OK)
  @UseGuards(new RoleGuard(['superAdmin', 'trainerAdmin']))
  public async createGroup(@Body() body: CreateGroupDto) {
    return this.groupService.createGroup(body);
  }

  @Post(GROUP_ROUTES.assignUsers)
  @ApiOperation({ summary: GROUP_ROUTES.assignUsers })
  @ApiResponse({
    status: HttpStatus.OK,
    description: GROUP_ROUTES.assignUsers,
    type: GroupEntity,
  })
  @HttpCode(HttpStatus.OK)
  @UseGuards(new RoleGuard(['superAdmin', 'trainerAdmin']))
  public async assignUsersToGroup(@Body() body: AssignUsersToGroupDto) {
    return this.groupService.assignUsersToGroup(body);
  }

  @Post(GROUP_ROUTES.getUsersByGroup)
  @ApiOperation({ summary: GROUP_ROUTES.getUsersByGroup })
  @ApiResponse({
    status: HttpStatus.OK,
    description: GROUP_ROUTES.getUsersByGroup,
    type: GroupEntity,
  })
  @HttpCode(HttpStatus.OK)
  @UseGuards(new RoleGuard(['trainerAdmin']))
  public async getUsersByGroup(@Body() body: GroupIdDto) {
    return this.groupService.getUsersByGroup(body);
  }

  @Post(GROUP_ROUTES.changeGroupForUsers)
  @ApiOperation({ summary: GROUP_ROUTES.changeGroupForUsers })
  @ApiResponse({
    status: HttpStatus.OK,
    description: GROUP_ROUTES.changeGroupForUsers,
    type: GroupEntity,
  })
  @HttpCode(HttpStatus.OK)
  @UseGuards(new RoleGuard(['trainerAdmin', 'superAdmin']))
  public async changeGroupForUsers(@Body() body: ChangeGroupDto) {
    return this.groupService.changeGroupForUsers(body);
  }

  @Post(GROUP_ROUTES.getGroupsByTrainer)
  @ApiOperation({ summary: GROUP_ROUTES.getGroupsByTrainer })
  @ApiResponse({
    status: HttpStatus.OK,
    description: GROUP_ROUTES.getGroupsByTrainer,
    type: GroupEntity,
  })
  @HttpCode(HttpStatus.OK)
  @UseGuards(new RoleGuard(['trainerAdmin', 'superAdmin']))
  public async getGroupsByTrainer(@Body() body: GetByTrainerDto) {
    return this.groupService.getGroupsByTrainer(body);
  }

  @Post(GROUP_ROUTES.removeUserFromTrainer)
  @ApiOperation({ summary: GROUP_ROUTES.removeUserFromTrainer })
  @ApiResponse({
    status: HttpStatus.OK,
    description: GROUP_ROUTES.removeUserFromTrainer,
    type: GroupEntity,
  })
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtAuthenticationGuard)
  public async removeUserFromTrainer(@Body() body: GetUserFromTrainerDto) {
    return this.groupService.removeUserFromTrainer(body);
  }

  @Post(GROUP_ROUTES.removeUsersFromGroup)
  @ApiOperation({ summary: GROUP_ROUTES.removeUsersFromGroup })
  @ApiResponse({
    status: HttpStatus.OK,
    description: GROUP_ROUTES.removeUsersFromGroup,
  })
  @HttpCode(HttpStatus.OK)
  @UseGuards(new RoleGuard(['superAdmin', 'trainerAdmin']))
  public async removeUsersFromGroup(@Body() body: RemoveUsersFromGroupDto) {
    return this.groupService.removeUsersFromGroup(body);
  }

  @Post(GROUP_ROUTES.deleteGroup)
  @ApiOperation({ summary: GROUP_ROUTES.deleteGroup })
  @ApiResponse({
    status: HttpStatus.OK,
    description: GROUP_ROUTES.deleteGroup,
    type: GroupEntity,
  })
  @HttpCode(HttpStatus.OK)
  @UseGuards(new RoleGuard(['trainerAdmin', 'superAdmin']))
  public async deleteGroup(@Body() body: GroupIdDto) {
    return this.groupService.deleteGroup(body);
  }

  @Post(GROUP_ROUTES.getAllGroups)
  @ApiOperation({ summary: GROUP_ROUTES.getAllGroups })
  @ApiResponse({
    status: HttpStatus.OK,
    description: GROUP_ROUTES.getAllGroups,
    type: GroupEntity,
  })
  @HttpCode(HttpStatus.OK)
  @UseGuards(new RoleGuard(['superAdmin']))
  public async getAllGroups() {
    return this.groupService.getAllGroups();
  }
}
