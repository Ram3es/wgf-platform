import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserEntity } from 'src/user/entities/user.entity';
import { FacebookAuthDto } from './dto/facebook-auth.dto';
import { FacebookAuthService } from './facebook-auth.service';

@ApiTags('facebook')
@Controller('facebook')
export class FacebookAuthController {
  constructor(private facebookAuthService: FacebookAuthService) {}

  @Post('auth')
  @ApiOperation({ summary: 'auth' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'auth',
    type: UserEntity,
  })
  @HttpCode(HttpStatus.OK)
  async authenticate(@Body() body: FacebookAuthDto) {
    return await this.facebookAuthService.authenticate(body);
  }
}
