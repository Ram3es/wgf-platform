import { IsEmail, IsOptional, MinLength } from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';

export class ResetPassWordDTO {
  @ApiProperty()
  @IsEmail()
  email: string;
  @ApiProperty()
  @MinLength(8)
  @IsOptional()
  password: string;
  @ApiProperty()
  @MinLength(8)
  @IsOptional()
  newPassword: string;
  @ApiProperty()
  @IsOptional()
  token: string;
  @ApiProperty()
  @IsOptional()
  userId: string;
}
