import { IsNotEmpty, IsOptional } from 'class-validator';

import { ApiProperty, PartialType } from '@nestjs/swagger';
import { AnswerEntity } from 'src/answer/entities/answer.entity';
import { ROLES } from 'src/constants/roles';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @ApiProperty()
  @IsNotEmpty()
  id: string;

  @ApiProperty()
  @IsOptional()
  role: ROLES;

  @ApiProperty()
  @IsOptional()
  isSubscriber: boolean;

  @ApiProperty()
  @IsOptional()
  answers: AnswerEntity[];

  @ApiProperty()
  @IsOptional()
  avatar: string;

  @ApiProperty()
  @IsOptional()
  country: string;

  @ApiProperty()
  @IsOptional()
  mobileNumber: string;

  @ApiProperty()
  @IsOptional()
  organizationName: string;

  @ApiProperty()
  @IsOptional()
  occupation: string;
}
