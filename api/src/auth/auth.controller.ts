import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { User } from 'src/decorators/user';
import JwtAuthenticationGuard from 'src/shared/guards/auth.guard';
import { UserEntity } from 'src/user/entities/user.entity';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/create-user.dto';
import { SignInDto } from './dto/sign-in.dto';

import { USER_ROUTES } from 'src/user/user.constants';

@Controller('user')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post(USER_ROUTES.signUp)
  @ApiOperation({ summary: USER_ROUTES.signUp })
  @ApiResponse({
    status: HttpStatus.OK,
    description: USER_ROUTES.signUp,
    type: UserEntity,
  })
  @HttpCode(HttpStatus.OK)
  public async signUp(@Body() body: CreateUserDto) {
    return await this.authService.signUp(body);
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
    return await this.authService.signIn(body);
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
    return await this.authService.logOut(id);
  }
}
