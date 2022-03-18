import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateTestAnswerDto {
  @ApiProperty({ example: 'Plan an adventurous trip' })
  @IsNotEmpty()
  value: string;

  @ApiProperty({ example: 'true' })
  @IsNotEmpty()
  isCorrect: boolean;
}
