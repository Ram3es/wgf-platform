import { Repository } from 'typeorm';

import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { ERRORS } from 'src/constants/errors';
import { fireAuth, firestore } from 'src/firebase';
import { UserEntity } from 'src/user/entities/user.entity';
import { SetLimitsDto } from './dto/set-game-limits.dto';

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

  async getLimits(id: string) {
    const data = await firestore
      .collection('admin-limits')
      .doc(`wgf:${id}`)
      .get();

    return data.data();
  }

  async setLimits(body: SetLimitsDto) {
    const { userId, ...rest } = body;

    const existTrainer = await this.getLimits(userId);
    if (!existTrainer) {
      await firestore.collection('admin-limits').doc(`wgf:${userId}`).set(rest);
    }

    await firestore
      .collection('admin-limits')
      .doc(`wgf:${userId}`)
      .update(rest);
  }
}
