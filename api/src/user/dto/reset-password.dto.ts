import { IsOptional } from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';
import { UpdatePassWordDTO } from './update-password.dto';

export class ResetPassWordDTO extends UpdatePassWordDTO {
  @ApiProperty()
  @IsOptional()
  token: string;
}
