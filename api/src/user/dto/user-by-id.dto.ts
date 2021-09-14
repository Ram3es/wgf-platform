import { IsNotEmpty } from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';

export class UserIdDto {
  @ApiProperty()
  @IsNotEmpty()
  userId: string;
}
