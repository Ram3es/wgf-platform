import { CreateSubjectDto } from './dto/create-subject.dto';
import { SubjectEntity } from './entities/subject.entity';
import { ERRORS } from 'src/constants/errors';
import { StreamEntity } from './entities/stream.entity';
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateStreamDto } from './dto/create-stream.dto';

@Injectable()
export class SainaService {
  constructor(
    @InjectRepository(StreamEntity)
    private readonly streamRepository: Repository<StreamEntity>,
    @InjectRepository(SubjectEntity)
    private readonly subjectRepository: Repository<SubjectEntity>
  ) {}

  async createStream(dto: CreateStreamDto) {
    const stream = await this.streamRepository.findOne({ stream: dto.stream });

    if (stream) {
      throw new HttpException(ERRORS.alreadyExist, HttpStatus.BAD_REQUEST);
    }
    return await this.streamRepository.save(dto);
  }
  async createSubject(dto: CreateSubjectDto) {
    const subject = await this.subjectRepository.findOne({ title: dto.title });

    if (subject) {
      throw new HttpException(ERRORS.alreadyExist, HttpStatus.BAD_REQUEST);
    }
    const stream = await this.streamRepository.findByIds(dto.streamIds);

    return await this.subjectRepository.save({ ...dto, streamIds: stream });
  }

  async findOneById(id: string) {
    return this.subjectRepository.findOne({ id });
  }
}
