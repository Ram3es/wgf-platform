import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserEntity } from 'src/user/entities/user.entity';
import { TokenVerificationDto } from '../dto/token-verification.dto';
import { GoogleAuthService } from './google-auth.service';

@ApiTags('google')
@Controller('google')
export class GoogleAuthController {
  constructor(private googleAuthService: GoogleAuthService) {}

  @Post('auth')
  @ApiOperation({ summary: 'auth' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'auth',
    type: UserEntity,
  })
  @HttpCode(HttpStatus.OK)
  async authenticate(@Body() tokenData: TokenVerificationDto) {
    return await this.googleAuthService.authenticate(tokenData.token);
  }
}
