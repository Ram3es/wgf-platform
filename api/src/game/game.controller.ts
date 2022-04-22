import { Controller, Post, UseGuards } from '@nestjs/common';

import { User } from 'src/decorators/user';
import { RoleGuard } from 'src/shared/guards/role.guard';

import { GAME_ROUTES } from './game.constants';
import { GameService } from './game.service';

@Controller(GAME_ROUTES.MAIN)
export class GameController {
  constructor(private readonly gameService: GameService) {}

  @Post(GAME_ROUTES.AUTH_ADMIN)
  @UseGuards(new RoleGuard(['trainerAdmin', 'superAdmin']))
  authAdmin(@User('id') id: string) {
    return this.gameService.authAdmin(id);
  }
}
