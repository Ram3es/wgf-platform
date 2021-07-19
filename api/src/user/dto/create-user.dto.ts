import { IsEmail, IsNotEmpty } from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';

export interface IAnswer {
  answerValue: number;
  questionNumber: number;
}

export class CreateUserDto {
  @ApiProperty()
  @IsNotEmpty()
  firstName: string;

  @ApiProperty()
  @IsNotEmpty()
  lastName: string;

  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsNotEmpty()
  isSubscriber: boolean;

  @ApiProperty()
  @IsNotEmpty()
  answers: IAnswer[];
}
