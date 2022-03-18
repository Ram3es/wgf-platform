import { StreamEntity } from './../entities/stream.entity';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateSubjectDto {
  @ApiProperty({ example: 'History' })
  @IsNotEmpty()
  title: string;

  @ApiProperty({ example: 'bd4bc467-77a5-4ea9-975b-16d1eebef55d' })
  @IsNotEmpty()
  streamIds: StreamEntity[];
}
