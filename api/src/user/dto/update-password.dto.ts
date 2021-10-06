import { MinLength } from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';

export class UpdatePassWordDTO {
  @ApiProperty()
  @MinLength(8)
  password: string;
  @ApiProperty()
  @MinLength(8)
  newPassword: string;
}
