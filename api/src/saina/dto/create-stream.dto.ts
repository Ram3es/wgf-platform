import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateStreamDto {
  @ApiProperty({ example: ' CWOM' })
  @IsNotEmpty()
  stream: string;

  @ApiProperty({ example: ' CWOM: Commerce without Math' })
  @IsNotEmpty()
  description: string;
}
