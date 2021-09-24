import { Exclude } from 'class-transformer';
import {
    Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn
} from 'typeorm';

import { ApiProperty } from '@nestjs/swagger';
import { AnswerEntity } from 'src/answer/entities/answer.entity';
import { ResultEntity } from 'src/answer/entities/result.entity';
import { ROLES } from 'src/constants/roles';

@Entity('user')
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty({ example: 'bd4bc467-77a5-4ea9-975b-16d1eebef55d' })
  id: string;

  @CreateDateColumn()
  @ApiProperty({ example: new Date() })
  created: Date;

  @UpdateDateColumn()
  @ApiProperty({ example: new Date() })
  @Exclude()
  updated: Date;

  @Column()
  @ApiProperty({ example: 'user@gmail.com' })
  email: string;

  @Column()
  @ApiProperty({ example: 'John' })
  firstName: string;

  @Column()
  @ApiProperty({ example: 'Smith' })
  lastName: string;

  @Column()
  @Exclude()
  password: string;

  @Column({
    type: 'varchar',
  })
  @Exclude()
  publicKey: string;

  @Column({
    type: 'enum',
    enum: ROLES,
    default: ROLES.user,
  })
  @ApiProperty({ example: ROLES.user })
  role: ROLES;

  @Column({
    nullable: true,
  })
  @ApiProperty({ example: 'Student/Working Professional' })
  jobStatus: string;

  @Column({
    default: false,
  })
  @ApiProperty({ example: true })
  isSubscriber: boolean;

  @Column({
    nullable: true,
  })
  @ApiProperty({ example: 'bd4bc447-88a5-4ea9-975b-16d1eebef55d' })
  trainerAdminId: string;

  @OneToMany(() => AnswerEntity, (data) => data.user)
  answers: AnswerEntity[];

  @OneToMany(() => ResultEntity, (data) => data.user)
  results: ResultEntity[];
}
