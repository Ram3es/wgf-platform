import { Body, Controller, HttpCode, HttpStatus, Post, Put, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { User } from 'src/decorators/user';
import JwtAuthenticationGuard from 'src/shared/guards/auth.guard';
import { RoleGuard } from '../shared/guards/role.guard';
import { CreateUserDto } from './dto/create-user.dto';
import { ResetPassWordDTO } from './dto/reset-password.dto';
import { SignInDto } from './dto/sign-in.dto';
import { UpdatePassWordDTO } from './dto/update-password.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserIdDto } from './dto/user-by-id.dto';
import { UserEntity } from './entities/user.entity';
import { UserService } from './user.service';

import { USER_ROUTES } from './user.constants';

@ApiTags(USER_ROUTES.main)
@Controller(USER_ROUTES.main)
export class UserController {
  constructor(private readonly userService: UserService) {}

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
  @UseGuards(JwtAuthenticationGuard)
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

  @Post(USER_ROUTES.getUserByToken)
  @ApiOperation({ summary: USER_ROUTES.getUserByToken })
  @ApiResponse({
    status: HttpStatus.OK,
    description: USER_ROUTES.getUserByToken,
    type: UserEntity,
  })
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtAuthenticationGuard)
  public async getUserByToken(@User('id') id: string) {
    return await this.userService.getUserById(id);
  }

  @Post(USER_ROUTES.getUsersByTrainer)
  @ApiOperation({ summary: USER_ROUTES.getUsersByTrainer })
  @ApiResponse({
    status: HttpStatus.OK,
    description: USER_ROUTES.getUsersByTrainer,
    isArray: true,
    type: [UserEntity],
  })
  @HttpCode(HttpStatus.OK)
  @UseGuards(new RoleGuard(['trainerAdmin']))
  public async getUsersByTrainer(@User('id') id: string) {
    return this.userService.getUsersByTrainer(id);
  }

  @Post(USER_ROUTES.getAllUsers)
  @ApiOperation({ summary: USER_ROUTES.getAllUsers })
  @ApiResponse({
    status: HttpStatus.OK,
    description: USER_ROUTES.getAllUsers,
    isArray: true,
    type: [UserEntity],
  })
  @HttpCode(HttpStatus.OK)
  @UseGuards(new RoleGuard(['superAdmin']))
  public async getAllUsers() {
    return this.userService.getAllUsers();
  }

  @Post(USER_ROUTES.getAllTrainers)
  @ApiOperation({ summary: USER_ROUTES.getAllTrainers })
  @ApiResponse({
    status: HttpStatus.OK,
    description: USER_ROUTES.getAllTrainers,
    isArray: true,
    type: [UserEntity],
  })
  @HttpCode(HttpStatus.OK)
  @UseGuards(new RoleGuard(['superAdmin']))
  public async getAllTrainers() {
    return this.userService.getAllTrainers();
  }

  @Post(USER_ROUTES.getTrainersByUser)
  @ApiOperation({ summary: USER_ROUTES.getTrainersByUser })
  @ApiResponse({
    status: HttpStatus.OK,
    description: USER_ROUTES.getTrainersByUser,
    isArray: true,
    type: [UserEntity],
  })
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtAuthenticationGuard)
  public async getTrainersByUser(@User('id') id: string) {
    return this.userService.getTrainersByUser(id);
  }

  @Post(USER_ROUTES.updateResetedPassword)
  @ApiOperation({ summary: USER_ROUTES.updateResetedPassword })
  @ApiResponse({
    status: HttpStatus.OK,
    description: USER_ROUTES.updateResetedPassword,
  })
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtAuthenticationGuard)
  public async updateResetedPassword(@Body() body: ResetPassWordDTO) {
    return await this.userService.updateResetedPassword(body);
  }

  @Post(USER_ROUTES.updateProfilePassword)
  @ApiOperation({ summary: USER_ROUTES.updateProfilePassword })
  @ApiResponse({
    status: HttpStatus.OK,
    description: USER_ROUTES.updateProfilePassword,
  })
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtAuthenticationGuard)
  public async updateProfilePassword(
    @User('id') id: string,
    @Body() body: UpdatePassWordDTO
  ) {
    return await this.userService.updateProfilePassword(id, body);
  }

  @Post(USER_ROUTES.deleteUser)
  @ApiOperation({ summary: USER_ROUTES.deleteUser })
  @ApiResponse({
    status: HttpStatus.OK,
    description: USER_ROUTES.deleteUser,
    type: UserEntity,
  })
  @HttpCode(HttpStatus.OK)
  @UseGuards(new RoleGuard(['superAdmin']))
  public async deleteUser(@Body() body: UserIdDto) {
    return await this.userService.deleteUser(body);
  }

  @Post(USER_ROUTES.deleteTrainer)
  @ApiOperation({ summary: USER_ROUTES.deleteTrainer })
  @ApiResponse({
    status: HttpStatus.OK,
    description: USER_ROUTES.deleteTrainer,
    type: UserEntity,
  })
  @HttpCode(HttpStatus.OK)
  @UseGuards(new RoleGuard(['superAdmin']))
  public async deleteTrainer(@Body() body: UserIdDto) {
    return await this.userService.deleteTrainer(body);
  }

  @Post(USER_ROUTES.resetPasswordRequest)
  @HttpCode(HttpStatus.OK)
  public async resetPasswordRequest(@Body() body: { email: string }) {
    return await this.userService.updatePasswordRequest(body);
  }
}
