import { IsNotEmpty } from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';

export class LimitsAvidTrainerEmailDto {
  @ApiProperty({ example: 'user@gmail.com' })
  @IsNotEmpty()
  email: string;
}
