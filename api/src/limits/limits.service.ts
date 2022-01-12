import { Repository } from 'typeorm';

import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LimitsEntity } from './entities/limits.entity';

@Injectable()
export class LimitsService {
  constructor(
    @InjectRepository(LimitsEntity)
    private readonly limitsRepository: Repository<LimitsEntity>
  ) {}

  async getTrainerAvidLimits(email: string) {
    const limit = await this.limitsRepository.findOne({
      where: {
        email,
      },
    });
    if (!limit) {
      throw new HttpException('No limits found', HttpStatus.NOT_FOUND);
    }
    const { id, created, ...limitInfo } = limit;

    return limitInfo;
  }
}
