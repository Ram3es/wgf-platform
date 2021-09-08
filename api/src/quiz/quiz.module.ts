import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AnswerModule } from 'src/answer/answer.module';
import { QuestionEntity } from 'src/question/entities/question.entity';
import { QuizEntity } from 'src/quiz/entities/quiz.entity';
import { UserModule } from '../user/user.module';
import { QuizController } from './quiz.controller';
import { QuizService } from './quiz.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([QuizEntity, QuestionEntity]),
    AnswerModule,
    UserModule,
    ConfigModule,
  ],
  controllers: [QuizController],
  providers: [QuizService],
})
export class QuizModule {}
