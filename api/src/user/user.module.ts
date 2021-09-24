import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AnswerEntity } from 'src/answer/entities/answer.entity';
import { ResultEntity } from 'src/answer/entities/result.entity';
import { ResetPasswordEntity } from './entities/reset-password.entity';
import { UserEntity } from './entities/user.entity';
import { JwtStrategy } from './jwt.strategy';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      UserEntity,
      AnswerEntity,
      ResetPasswordEntity,
      ResultEntity,
    ]),
    JwtModule.register({}),
    PassportModule.register({}),
    ConfigModule,
  ],
  controllers: [UserController],
  providers: [UserService, JwtStrategy],
  exports: [UserService],
})
export class UserModule {}
