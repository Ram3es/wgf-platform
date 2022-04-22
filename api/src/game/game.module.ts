import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserEntity } from 'src/user/entities/user.entity';

import { GameController } from './game.controller';
import { GameService } from './game.service';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  controllers: [GameController],
  providers: [GameService],
})
export class GameModule {}
