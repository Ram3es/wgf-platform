import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { ApiProperty } from '@nestjs/swagger';
import { CaasQuizAnswerEntity } from './caas-quiz-answer.entity';

@Entity('user')
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty({ example: 'bd4bc467-77a5-4ea9-975b-16d1eebef55d' })
  id: string;

  @Column()
  @ApiProperty({ example: 'user@gmail.com' })
  email: string;

  @Column()
  @ApiProperty({ example: 'John' })
  firstName: string;

  @Column()
  @ApiProperty({ example: 'Smith' })
  lastName: string;

  @Column({ nullable: true })
  @ApiProperty({ example: 'student' })
  role: string;

  @Column()
  @ApiProperty({ example: true })
  isSubscriber: boolean;

  @ApiProperty({ example: 'IAnswer[]' })
  @OneToMany(() => CaasQuizAnswerEntity, (data) => data.user)
  answers: CaasQuizAnswerEntity[];
}
