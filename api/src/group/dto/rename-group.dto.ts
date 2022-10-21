import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class RenameGroupDto {
  @ApiProperty()
  @IsNotEmpty()
  groupId: string;

  @ApiProperty()
  @IsNotEmpty()
  name: string;
}
