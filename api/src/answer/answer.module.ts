import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QuestionEntity } from 'src/question/entities/question.entity';
import { QuizEntity } from 'src/quiz/entities/quiz.entity';
import { UserModule } from '../user/user.module';
import { AnswerController } from './answer.controller';
import { AnswerService } from './answer.service';
import { AnswerEntity } from './entities/answer.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([AnswerEntity, QuestionEntity, QuizEntity]),
    UserModule,
  ],
  controllers: [AnswerController],
  providers: [AnswerService],
  exports: [AnswerService],
})
export class AnswerModule {}
