import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';

import { ApiProperty } from '@nestjs/swagger';
import { QuestionEntity } from './question.entity';

@Entity('answer-option')
export class AnswerOptionEntity {
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty({ example: 'bd4bc467-77a5-4ea9-975b-16d1eebef55d' })
  id: string;

  @Column()
  @ApiProperty({ example: 'Basic' })
  text: string;

  @ManyToMany(() => QuestionEntity, (data) => data.answerOptions)
  @JoinTable()
  questions: QuestionEntity[];
}
