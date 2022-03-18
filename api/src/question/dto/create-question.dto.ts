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

  @ApiProperty({ example: 'Section_1' })
  @IsOptional()
  section: string;

  @ApiProperty({ example: 'E.g. text' })
  @IsOptional()
  placeholder: string;

  @ApiProperty({ example: '#ffffff' })
  @IsOptional()
  color: string;

  @ApiProperty({ example: 1 })
  order: number;

  @ApiProperty({ example: 'single/options/test' })
  type: QuestionType;

  @ApiProperty({ example: 'string[]' })
  @IsOptional()
  answerOptionsId: string[];

  @ApiProperty({ example: 'string[]' })
  @IsOptional()
  answerTestIds: string[];

  @ApiProperty({ example: 'string[]' })
  quizesId: string[];
}
