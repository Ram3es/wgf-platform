import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

export class CreateAnswerDto {
  @ApiProperty({ example: 'bd4bc467-77a5-4ea9-975b-16d1eebef55d' })
  id: string;

  @ApiProperty({ example: '5/true/Basic' })
  value: string;

  @IsOptional()
  @ApiProperty({ example: true })
  isCorrect?: boolean;

  @ApiProperty({ example: 'bd4bc467-77a5-4ea9-975b-16d1eebef55d' })
  questionId: string;

  @ApiProperty({ example: 'bd4bc467-77a5-4ea9-975b-16d1eebef55d' })
  quizId: string;
}
