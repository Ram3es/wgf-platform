import { IsNotEmpty } from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';

export class getResultDto {
  @ApiProperty()
  @IsNotEmpty()
  userId: string;

  @ApiProperty()
  @IsNotEmpty()
  quizId: string;
}
