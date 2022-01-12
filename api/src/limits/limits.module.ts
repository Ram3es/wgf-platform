import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LimitsEntity } from './entities/limits.entity';
import { LimitsController } from './limits.controller';
import { LimitsService } from './limits.service';

@Module({
  imports: [TypeOrmModule.forFeature([LimitsEntity])],
  controllers: [LimitsController],
  providers: [LimitsService],
})
export class LimitsModule {}
