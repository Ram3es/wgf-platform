import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm';

import { ApiProperty } from '@nestjs/swagger';

import { LIMITS_ROUTES } from '../limits.constants';

@Entity(LIMITS_ROUTES.main)
export class LimitsEntity {
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty({ example: 'bd4bc467-77a5-4ea9-975b-16d1eebef55d' })
  id: string;

  @CreateDateColumn()
  @ApiProperty({ example: new Date() })
  created: Date;

  @Column()
  @ApiProperty({ example: 'user@gmail.com' })
  email: string;

  @CreateDateColumn()
  @ApiProperty({ example: new Date() })
  expirationDate: Date;

  @Column()
  @ApiProperty({ example: 5 })
  numberOfGames: number;

  @Column()
  @ApiProperty({ example: 20 })
  playersPerGame: number;
}
