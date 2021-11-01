import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { ApiProperty } from '@nestjs/swagger';
import { ResultEntity } from 'src/answer/entities/result.entity';
import { QuestionEntity } from 'src/question/entities/question.entity';
import { QuizEntity } from 'src/quiz/entities/quiz.entity';
import { UserEntity } from 'src/user/entities/user.entity';

@Entity('answer')
export class AnswerEntity {
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty({ example: 'bd4bc467-77a5-4ea9-975b-16d1eebef55d' })
  id: string;

  @Column()
  @ApiProperty({ example: 'CaasQuiz' })
  value: string;

  @ManyToOne(() => UserEntity, (data) => data.answers, {
    onDelete: 'CASCADE',
  })
  user: UserEntity;

  @ManyToOne(() => QuizEntity, (data) => data.answers, {
    onDelete: 'CASCADE',
  })
  quiz: QuizEntity;

  @ManyToOne(() => QuestionEntity, (data) => data.answers, {
    onDelete: 'CASCADE',
  })
  question: QuestionEntity;

  @ManyToOne(() => ResultEntity, (data) => data.answers, {
    onDelete: 'CASCADE',
  })
  result: ResultEntity;
}
