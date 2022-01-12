import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_FILTER } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { config } from 'src/constants/config';
import { InvitationModule } from './ invitation/ invitation.module';
import { AnswerModule } from './answer/answer.module';
import { AuthModule } from './auth/auth.module';
import { FacebookAuthModule } from './auth/facebook-auth/facebook-auth.module';
import { GoogleAuthModule } from './auth/google-auth/google-auth.module';
import { GroupModule } from './group/group.module';
import { QuestionModule } from './question/question.module';
import { QuizModule } from './quiz/quiz.module';
import { DatabaseConfig } from './shared/configs/database.config';
import { HttpErrorFilter } from './shared/http-error.filter';
import { UserModule } from './user/user.module';
import { LimitsModule } from './limits/limits.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [config],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useClass: DatabaseConfig,
    }),
    UserModule,
    QuizModule,
    QuestionModule,
    AnswerModule,
    GroupModule,
    InvitationModule,
    AuthModule,
    GoogleAuthModule,
    FacebookAuthModule,
    LimitsModule,
  ],
  providers: [
    {
      provide: APP_FILTER,
      useClass: HttpErrorFilter,
    },
  ],
})
export class AppModule {}
