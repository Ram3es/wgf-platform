import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_FILTER } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { config } from 'src/constants/config';
import { AnswerModule } from './answer/answer.module';
import { ServeHTMLMiddleware } from './app.middleware';
import { QuestionModule } from './question/question.module';
import { QuizModule } from './quiz/quiz.module';
import { DatabaseConfig } from './shared/configs/database.config';
import { HttpErrorFilter } from './shared/http-error.filter';
import { UserModule } from './user/user.module';

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
  ],
  providers: [
    {
      provide: APP_FILTER,
      useClass: HttpErrorFilter,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(ServeHTMLMiddleware)
      .forRoutes({ path: 'static/*', method: RequestMethod.GET });
  }
}
