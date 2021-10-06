import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from 'src/user/entities/user.entity';
import { GroupEntity } from './entities/group.entity';
import { GroupController } from './group.controller';
import { GroupService } from './group.service';

@Module({
  imports: [TypeOrmModule.forFeature([GroupEntity, UserEntity])],
  controllers: [GroupController],
  providers: [GroupService],
  exports: [GroupService],
})
export class GroupModule {}
