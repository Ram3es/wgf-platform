import { SubjectEntity } from './entities/subject.entity';
import { StreamEntity } from './entities/stream.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { SainaService } from './saina.service';
import { SainaController } from './saina.controller';

@Module({
  imports: [TypeOrmModule.forFeature([StreamEntity, SubjectEntity])],
  controllers: [SainaController],
  providers: [SainaService],
})
export class SainaModule {}
