import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { ApiProperty } from '@nestjs/swagger';
import { UserEntity } from 'src/user/entities/user.entity';

@Entity('caas-quiz-answers')
export class CaasQuizAnswerEntity {
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty({ example: 'bd4bc467-77a5-4ea9-975b-16d1eebef55d' })
  id: string;

  @Column()
  @ApiProperty({ example: 5 })
  answerValue: number;

  @Column()
  @ApiProperty({ example: 1 })
  questionNumber: number;

  @ManyToOne(() => UserEntity, (data) => data.answers, {
    onDelete: 'CASCADE',
  })
  user: UserEntity;
}
