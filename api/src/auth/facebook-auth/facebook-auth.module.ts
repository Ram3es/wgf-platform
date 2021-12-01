import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { AuthModule } from '../auth.module';
import { FacebookAuthController } from './facebook-auth.controller';
import { FacebookAuthService } from './facebook-auth.service';

@Module({
  imports: [AuthModule, HttpModule],
  controllers: [FacebookAuthController],
  providers: [FacebookAuthService],
})
export class FacebookAuthModule {}
