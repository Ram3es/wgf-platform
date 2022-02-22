import { HttpModule } from '@nestjs/axios';
import { forwardRef, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InvitationEntity } from 'src/ invitation/entities/ invitation.entity';
import { JwtStrategy } from 'src/auth/jwt.strategy';
import { UserEntity } from 'src/user/entities/user.entity';
import { UserModule } from '../user/user.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity, InvitationEntity]),
    JwtModule.register({}),
    PassportModule.register({}),
    ConfigModule,
    forwardRef(() => UserModule),
    HttpModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}
