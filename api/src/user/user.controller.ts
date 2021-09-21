import { Response } from 'express';

import {
    Body, Controller, Get, HttpCode, HttpStatus, Param, Post, Put, Res, UseGuards
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { User } from 'src/decorators/user';
import JwtAuthenticationGuard from 'src/shared/guards/auth.guard';
import { RoleGuard } from '../shared/guards/role.guard';
import { CreateTrainerAdminDto } from './dto/create-trainer-admin.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { ResetPassWordDTO } from './dto/reset-password.dto';
import { SignInDto } from './dto/sign-in.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserIdDto } from './dto/user-by-id.dto';
import { UserEntity } from './entities/user.entity';
import { USER_ROUTES } from './user.routes';
import { UserService } from './user.service';

@ApiTags(USER_ROUTES.main)
@Controller(USER_ROUTES.main)
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly configService: ConfigService
  ) {}

  @Post(USER_ROUTES.signUp)
  @ApiOperation({ summary: USER_ROUTES.signUp })
  @ApiResponse({
    status: HttpStatus.OK,
    description: USER_ROUTES.signUp,
    type: UserEntity,
  })
  @HttpCode(HttpStatus.OK)
  public async signUp(@Body() body: CreateUserDto) {
    return await this.userService.signUp(body);
  }

  @Post(USER_ROUTES.signIn)
  @ApiOperation({ summary: USER_ROUTES.signIn })
  @ApiResponse({
    status: HttpStatus.OK,
    description: USER_ROUTES.signIn,
    type: UserEntity,
  })
  @HttpCode(HttpStatus.OK)
  public async signIn(@Body() body: SignInDto) {
    return await this.userService.signIn(body);
  }

  @Put(USER_ROUTES.update)
  @ApiOperation({ summary: USER_ROUTES.update })
  @ApiResponse({
    status: HttpStatus.OK,
    description: USER_ROUTES.update,
    type: UserEntity,
  })
  @HttpCode(HttpStatus.OK)
  public async updateUser(@Body() body: UpdateUserDto) {
    return await this.userService.updateUser(body);
  }

  @Put(USER_ROUTES.logOut)
  @ApiOperation({ summary: USER_ROUTES.logOut })
  @ApiResponse({
    status: HttpStatus.OK,
    description: USER_ROUTES.logOut,
  })
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtAuthenticationGuard)
  public async logout(@User('id') id: string) {
    return await this.userService.logOut(id);
  }

  @Post(USER_ROUTES.getUserById)
  @ApiOperation({ summary: USER_ROUTES.getUserById })
  @ApiResponse({
    status: HttpStatus.OK,
    description: USER_ROUTES.getUserById,
    type: UserEntity,
  })
  @HttpCode(HttpStatus.OK)
  public async getUserById(@Body() body: UserIdDto) {
    return await this.userService.getUserById(body.userId);
  }

  @Put(USER_ROUTES.createTrainerAdmin)
  @ApiOperation({ summary: USER_ROUTES.createTrainerAdmin })
  @ApiResponse({
    status: HttpStatus.OK,
    description: USER_ROUTES.createTrainerAdmin,
    type: UserEntity,
  })
  @HttpCode(HttpStatus.OK)
  @UseGuards(new RoleGuard(['superAdmin']))
  public async createTrainerAdmin(@Body() body: CreateTrainerAdminDto) {
    return await this.userService.createTrainerAdmin(body);
  }

  @Put(USER_ROUTES.addUsersTrainer)
  @ApiOperation({ summary: USER_ROUTES.addUsersTrainer })
  @ApiResponse({
    status: HttpStatus.OK,
    description: USER_ROUTES.addUsersTrainer,
    type: UserEntity,
  })
  @HttpCode(HttpStatus.OK)
  @UseGuards(new RoleGuard(['trainerAdmin']))
  public async addUsersTrainer(
    @User('id') id: string,
    @Body() body: UserIdDto
  ) {
    return await this.userService.addUsersTrainer(id, body);
  }

  @Post(USER_ROUTES.updatePassword)
  @ApiOperation({ summary: USER_ROUTES.updatePassword })
  @ApiResponse({
    status: HttpStatus.OK,
    description: USER_ROUTES.updatePassword,
  })
  @HttpCode(HttpStatus.OK)
  public async updatePassword(@Body() body: ResetPassWordDTO) {
    return await this.userService.updatePassword(body);
  }

  @Get(USER_ROUTES.resetPassword)
  @HttpCode(HttpStatus.OK)
  public async resetPassword(
    @Param() params: { token: string },
    @Res() res: Response
  ) {
    try {
      const WEB_BASE_URL = this.configService.get('WEB_BASE_URL');
      const link = `${WEB_BASE_URL}password/?token=${params.token}`;
      return res.status(HttpStatus.MOVED_PERMANENTLY).redirect(link);
    } catch (error) {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(error);
    }
  }

  @Post(USER_ROUTES.resetPasswordRequest)
  @HttpCode(HttpStatus.OK)
  public async resetPasswordRequest(@Body() body: { email: string }) {
    return await this.userService.updatePasswordRequest(body);
  }
}
