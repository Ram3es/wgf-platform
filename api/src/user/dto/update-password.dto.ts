import { ApiProperty } from '@nestjs/swagger';

export class UpdatePassWordDTO {
  @ApiProperty()
  password: string;
  @ApiProperty()
  newPassword: string;
}
