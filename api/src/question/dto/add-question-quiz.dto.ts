import { IsOptional } from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';

export class AddQuestionToQuizDto {
  @ApiProperty({ example: 'bd4bc467-77a5-4ea9-975b-16d1eebef55d' })
  questionId: string;

  @ApiProperty({ example: 'string[]' })
  quizesId: string[];

  @ApiProperty({ example: 'string[]' })
  @IsOptional()
  answerOptionsId: string[];
}
