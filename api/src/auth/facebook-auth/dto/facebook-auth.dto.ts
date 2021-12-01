import { IsOptional } from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';
import { SocialLoginDto } from 'src/auth/dto/social-login.dto';

export class FacebookAuthDto extends SocialLoginDto {
  @ApiProperty()
  @IsOptional()
  token: string;
}
