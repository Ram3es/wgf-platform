import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { ApiProperty } from '@nestjs/swagger';
import { AnswerEntity } from 'src/answer/entities/answer.entity';
import { QuizEntity } from 'src/quiz/entities/quiz.entity';
import { AnswerOptionEntity } from './answer-option.entity';
import { AnswerTestEntity } from './answer-test.entity';

export enum QuestionType {
  single = 'single',
  options = 'options',
  test = 'test',
  select = 'select',
}

@Entity('question')
export class QuestionEntity {
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty({ example: 'bd4bc467-77a5-4ea9-975b-16d1eebef55d' })
  id: string;

  @Column()
  @ApiProperty({ example: 'What are you?' })
  title: string;

  @Column()
  @ApiProperty({ example: 'Concern' })
  category: string;

  @Column()
  @ApiProperty({ example: 1 })
  order: number;

  @Column({ type: 'enum', enum: QuestionType, default: 'single' })
  @ApiProperty({ example: 'single/options/test' })
  type: QuestionType;

  @Column({ default: '', nullable: true })
  @ApiProperty({ example: 'LOGIC' })
  subcategory: string;

  @Column({ default: '', nullable: true })
  @ApiProperty({ example: 'Section_1' })
  section: string;

  @Column({ default: '', nullable: true })
  @ApiProperty({ example: 'E.g. text' })
  placeholder: string;

  @Column({ default: '' })
  @ApiProperty({ example: '#ffffff' })
  color: string;

  @OneToMany(() => AnswerEntity, (data) => data.question)
  answers: AnswerEntity[];

  @ManyToMany(() => AnswerOptionEntity, (data) => data.questions)
  @JoinTable()
  answerOptions: AnswerOptionEntity[];

  @OneToMany(() => AnswerTestEntity, (data) => data.questionId)
  testAnswers: AnswerTestEntity[];

  @ManyToMany(() => QuizEntity, (data) => data.questions)
  @JoinTable()
  quizes: QuizEntity[];
}
