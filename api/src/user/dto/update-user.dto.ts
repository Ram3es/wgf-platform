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
  @IsNotEmpty()
  role: ROLES;

  @ApiProperty()
  @IsOptional()
  @IsNotEmpty()
  isSubscriber: boolean;

  @ApiProperty()
  @IsOptional()
  @IsNotEmpty()
  answers: AnswerEntity[];

  @ApiProperty()
  @IsOptional()
  @IsNotEmpty()
  trainerAdminId: string;
}
