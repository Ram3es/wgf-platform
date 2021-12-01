import { IsNotEmpty, IsString } from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';

export class TokenVerificationDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  token: string;
}
