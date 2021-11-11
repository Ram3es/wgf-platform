import { IsOptional } from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';
import { QuestionType } from '../entities/question.entity';

export class CreateQuestionDto {
  @ApiProperty({ example: 'What are you?' })
  title: string;

  @ApiProperty({ example: 'Concern' })
  category: string;

  @ApiProperty({ example: 'LOGIC' })
  @IsOptional()
  subcategory: string;

  @ApiProperty({ example: 'E.g. text' })
  @IsOptional()
  placeholder: string;

  @ApiProperty({ example: 1 })
  order: number;

  @ApiProperty({ example: 'single/options' })
  type: QuestionType;

  @ApiProperty({ example: 'string[]' })
  @IsOptional()
  answerOptionsId: string[];

  @ApiProperty({ example: 'string[]' })
  quizesId: string[];
}
