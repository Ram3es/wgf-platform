import { IsOptional } from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';

export class CreateAnswerOptionDto {
  @ApiProperty({ example: 'LOGIC' })
  text: string;

  @ApiProperty({ example: 'string[]' })
  @IsOptional()
  questionIds: string[];
}
