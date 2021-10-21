import { Response } from 'express';

import {
    Body, Controller, Get, HttpCode, HttpStatus, Param, Post, Res, UseGuards
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { User } from 'src/decorators/user';
import JwtAuthenticationGuard from 'src/shared/guards/auth.guard';
import { RoleGuard } from '../shared/guards/role.guard';
import { InvitationService } from './ invitation.service';
import { CreateInvitationDto } from './dto/create-invitation.dto';
import { InvitationEntity } from './entities/ invitation.entity';

import { INVITATION_ROUTES } from './invitation.constants';

@Controller(INVITATION_ROUTES.main)
export class InvitationController {
  constructor(
    private readonly invitationService: InvitationService,
    private readonly configService: ConfigService
  ) {}

  @Post(INVITATION_ROUTES.inviteStudentFromTrainer)
  @ApiOperation({ summary: INVITATION_ROUTES.inviteStudentFromTrainer })
  @ApiResponse({
    status: HttpStatus.OK,
    description: INVITATION_ROUTES.inviteStudentFromTrainer,
    type: InvitationEntity,
  })
  @HttpCode(HttpStatus.OK)
  @UseGuards(new RoleGuard(['trainerAdmin']))
  public async inviteStudentFromTrainer(
    @User('id') id: string,
    @Body() body: CreateInvitationDto
  ) {
    return this.invitationService.inviteStudentFromTrainer(id, body);
  }

  @Post(INVITATION_ROUTES.inviteTrainer)
  @ApiOperation({ summary: INVITATION_ROUTES.inviteTrainer })
  @ApiResponse({
    status: HttpStatus.OK,
    description: INVITATION_ROUTES.inviteTrainer,
    type: InvitationEntity,
  })
  @HttpCode(HttpStatus.OK)
  @UseGuards(new RoleGuard(['superAdmin']))
  public async inviteTrainer(
    @User('id') id: string,
    @Body() body: CreateInvitationDto
  ) {
    return this.invitationService.inviteTrainer(id, body);
  }

  @Post(INVITATION_ROUTES.inviteUser)
  @ApiOperation({ summary: INVITATION_ROUTES.inviteUser })
  @ApiResponse({
    status: HttpStatus.OK,
    description: INVITATION_ROUTES.inviteUser,
    type: InvitationEntity,
  })
  @HttpCode(HttpStatus.OK)
  @UseGuards(new RoleGuard(['superAdmin']))
  public async inviteUser(
    @User('id') id: string,
    @Body() body: CreateInvitationDto
  ) {
    return this.invitationService.inviteUser(id, body);
  }

  @Post(INVITATION_ROUTES.requestTrainerFromStudent)
  @ApiOperation({ summary: INVITATION_ROUTES.requestTrainerFromStudent })
  @ApiResponse({
    status: HttpStatus.OK,
    description: INVITATION_ROUTES.requestTrainerFromStudent,
    type: InvitationEntity,
  })
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtAuthenticationGuard)
  public async requestTrainerFromStudent(
    @User('id') id: string,
    @Body() body: CreateInvitationDto
  ) {
    return this.invitationService.requestTrainerFromStudent(id, body);
  }

  @Post(INVITATION_ROUTES.getInvitations)
  @ApiOperation({ summary: INVITATION_ROUTES.getInvitations })
  @ApiResponse({
    status: HttpStatus.OK,
    description: INVITATION_ROUTES.getInvitations,
    type: InvitationEntity,
  })
  @HttpCode(HttpStatus.OK)
  @UseGuards(new RoleGuard(['trainerAdmin', 'superAdmin']))
  public async getInvitations(@User('id') id: string) {
    return this.invitationService.getInvitations(id);
  }

  @Post(INVITATION_ROUTES.deleteInvitation)
  @ApiOperation({ summary: INVITATION_ROUTES.deleteInvitation })
  @ApiResponse({
    status: HttpStatus.OK,
    description: INVITATION_ROUTES.deleteInvitation,
    type: InvitationEntity,
  })
  @HttpCode(HttpStatus.OK)
  @UseGuards(new RoleGuard(['trainerAdmin', 'superAdmin']))
  public async deleteInvitations(@Body() body: { invitationIds: string[] }) {
    return this.invitationService.deleteInvitations(body);
  }

  @Post(INVITATION_ROUTES.approveAllTrainerRequests)
  @ApiOperation({ summary: INVITATION_ROUTES.approveAllTrainerRequests })
  @ApiResponse({
    status: HttpStatus.OK,
    description: INVITATION_ROUTES.approveAllTrainerRequests,
    type: InvitationEntity,
  })
  @HttpCode(HttpStatus.OK)
  @UseGuards(new RoleGuard(['trainerAdmin']))
  public async approveAllTrainerRequests(@User('id') id: string) {
    return this.invitationService.approveAllTrainerRequests(id);
  }

  @Get(INVITATION_ROUTES.acceptInvitationTrainerToExistingStudent)
  @HttpCode(HttpStatus.OK)
  public async acceptInvitationTrainerToExistingStudent(
    @Param() params: { token: string },
    @Res() res: Response
  ) {
    await this.invitationService.acceptInvitationTrainerToStudent({
      token: params.token,
    });
    const WEB_BASE_URL = this.configService.get('WEB_BASE_URL');
    const link = `${WEB_BASE_URL}dashboard`;
    return res.status(HttpStatus.MOVED_PERMANENTLY).redirect(link);
  }

  @Get(INVITATION_ROUTES.acceptInvitationExistingTrainer)
  @HttpCode(HttpStatus.OK)
  public async acceptInvitationExistingTrainer(
    @Param() params: { token: string },
    @Res() res: Response
  ) {
    await this.invitationService.acceptInvitationExistingTrainer({
      token: params.token,
    });
    const WEB_BASE_URL = this.configService.get('WEB_BASE_URL');
    const link = `${WEB_BASE_URL}dashboard`;
    return res.status(HttpStatus.MOVED_PERMANENTLY).redirect(link);
  }

  @Get(INVITATION_ROUTES.acceptInvitationNotExistUser)
  @HttpCode(HttpStatus.OK)
  public async acceptInvitationNotExistUser(
    @Param() params: { token: string },
    @Res() res: Response
  ) {
    await this.invitationService.acceptInvitationNotExistUser({
      token: params.token,
    });
    const WEB_BASE_URL = this.configService.get('WEB_BASE_URL');
    const link = `${WEB_BASE_URL}sign-up`;
    return res.status(HttpStatus.MOVED_PERMANENTLY).redirect(link);
  }

  @Get(INVITATION_ROUTES.acceptRequestTrainer)
  @HttpCode(HttpStatus.OK)
  public async acceptRequestTrainer(
    @Param() params: { token: string },
    @Res() res: Response
  ) {
    await this.invitationService.acceptRequestTrainer({
      token: params.token,
    });
    const WEB_BASE_URL = this.configService.get('WEB_BASE_URL');
    const link = WEB_BASE_URL;
    return res.status(HttpStatus.MOVED_PERMANENTLY).redirect(link);
  }
}
