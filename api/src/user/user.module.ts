import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CaasQuizAnswerEntity } from './entities/caas-quiz-answer.entity';
import { UserEntity } from './entities/user.entity';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity, CaasQuizAnswerEntity])],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
