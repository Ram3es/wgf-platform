import { Repository } from 'typeorm';

import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { ERRORS } from 'src/constants/errors';
import { fireAuth } from 'src/firebase';
import { UserEntity } from 'src/user/entities/user.entity';

@Injectable()
export class GameService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>
  ) {}

  async authAdmin(id: string) {
    const user = await this.userRepository.findOne(id);

    if (!user) {
      throw new HttpException(ERRORS.notExist, HttpStatus.NOT_FOUND);
    }

    const token = await fireAuth.createCustomToken(`wgf:${user.id}`);

    return { token, displayName: `${user.firstName} ${user.lastName}` };
  }
}
