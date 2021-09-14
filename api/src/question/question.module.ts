import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QuizEntity } from 'src/quiz/entities/quiz.entity';
import { AnswerOptionEntity } from './entities/answer-option.entity';
import { QuestionEntity } from './entities/question.entity';
import { QuestionController } from './question.controller';
import { QuestionService } from './question.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([QuestionEntity, AnswerOptionEntity, QuizEntity]),
  ],
  controllers: [QuestionController],
  providers: [QuestionService],
})
export class QuestionModule {}
