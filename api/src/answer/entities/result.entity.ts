import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

import { ApiProperty } from '@nestjs/swagger';
import { QuizEntity } from 'src/quiz/entities/quiz.entity';
import { UserEntity } from 'src/user/entities/user.entity';

@Entity('result')
export class ResultEntity {
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty({ example: 'bd4bc467-77a5-4ea9-975b-16d1eebef55d' })
  id: string;

  @UpdateDateColumn()
  @ApiProperty({ example: new Date() })
  updated: Date;

  @Column()
  @ApiProperty({ example: '25%/Completed' })
  status: string;

  @ManyToOne(() => UserEntity, (data) => data.answers, {
    onDelete: 'CASCADE',
  })
  user: UserEntity;

  @ManyToOne(() => QuizEntity, (data) => data.answers, {
    onDelete: 'CASCADE',
  })
  quiz: QuizEntity;
}
