import { Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { ApiProperty } from '@nestjs/swagger';
import { QuestionEntity } from 'src/question/entities/question.entity';
import { AnswerEntity } from '../../answer/entities/answer.entity';

@Entity('quiz')
export class QuizEntity {
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty({ example: 'bd4bc467-77a5-4ea9-975b-16d1eebef55d' })
  id: string;

  @Column({ unique: true })
  @ApiProperty({ example: 'CaasQuiz' })
  title: string;

  @OneToMany(() => AnswerEntity, (data) => data.quiz)
  answers: AnswerEntity[];

  @ManyToMany(() => QuestionEntity, (data) => data.quizes)
  @JoinTable()
  questions: QuestionEntity[];
}
