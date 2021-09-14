import { IsEmail } from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';

export class CreateTrainerAdminDto {
  @ApiProperty()
  @IsEmail()
  email: string;
}
