import { IsNotEmpty, IsOptional } from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';

import { INVITATION_TYPE } from '../invitation.constants';

export class CreateInvitationDto {
  @ApiProperty({
    example: 'bd4bc467-77a5-4ea9-975b-16d1eebef55d / user@mail.com',
  })
  @IsNotEmpty()
  to: string;

  @ApiProperty({
    example: 'User User',
  })
  @IsOptional()
  name: string;

  @ApiProperty({
    example: INVITATION_TYPE.student,
  })
  @IsOptional()
  type: INVITATION_TYPE;

  @ApiProperty({
    example: 'bd4bc467-77a5-4ea9-975b-16d1eebef55d / user@mail.com',
  })
  @IsOptional()
  groupId: string;
}
