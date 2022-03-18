import { QuestionEntity } from './question.entity';
import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('test-answer')
export class AnswerTestEntity {
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty({ example: 'bd4bc467-77a5-4ea9-975b-16d1eebef55d' })
  id: string;

  @Column()
  @ApiProperty({ example: 'Its original state' })
  value: string;

  @Column()
  @ApiProperty({ example: 'true' })
  isCorrect: boolean;

  @ManyToOne(() => QuestionEntity, (data) => data.testAnswers, {
    onDelete: 'CASCADE',
  })
  questionId: QuestionEntity;
}
