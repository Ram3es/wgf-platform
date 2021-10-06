import { IsNotEmpty } from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';

export class GroupIdDto {
  @ApiProperty({ example: ['bd4bc467-77a5-4ea9-975b-16d1eebef55d'] })
  @IsNotEmpty()
  groupId: string;
}
