import { IsNotEmpty } from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';

export class BodyIdDto {
  @ApiProperty()
  @IsNotEmpty()
  id: string;
}
