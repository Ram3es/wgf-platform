import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsNotEmpty } from 'class-validator';

export class SetLimitsDto {
  @ApiProperty()
  @IsNotEmpty()
  userId: string;

  @ApiProperty()
  @IsOptional()
  playersPerGame: string;

  @ApiProperty()
  @IsOptional()
  numberOfGames: string;

  @ApiProperty()
  @IsOptional()
  gameDuration: string;

  @ApiProperty()
  @IsOptional()
  expirationDate: Date;
}
