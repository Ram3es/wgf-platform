import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GroupEntity } from 'src/group/entities/group.entity';
import { UserEntity } from 'src/user/entities/user.entity';
import { GroupModule } from '../group/group.module';
import { UserModule } from '../user/user.module';
import { InvitationController } from './ invitation.controller';
import { InvitationService } from './ invitation.service';
import { InvitationEntity } from './entities/ invitation.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([InvitationEntity, UserEntity, GroupEntity]),
    GroupModule,
    ConfigModule,
    UserModule,
  ],
  controllers: [InvitationController],
  providers: [InvitationService],
})
export class InvitationModule {}
