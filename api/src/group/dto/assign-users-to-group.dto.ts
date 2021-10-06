import { IsNotEmpty } from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';

export class AssignUsersToGroupDto {
  @ApiProperty()
  @IsNotEmpty()
  groupId: string;
  @ApiProperty()
  @IsNotEmpty()
  userIds: string[];
}
