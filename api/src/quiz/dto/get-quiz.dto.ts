import { IsNotEmpty } from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';

export class getQuizDto {
  @ApiProperty()
  @IsNotEmpty()
  quizId: string;
}
