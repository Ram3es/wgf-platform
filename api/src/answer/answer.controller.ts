import { Body, Controller, HttpCode, HttpStatus, Post, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { User } from 'src/decorators/user';
import JwtAuthenticationGuard from 'src/shared/guards/auth.guard';
import { ANSWER_ROUTES } from './answer.routes';
import { AnswerService } from './answer.service';
import { CreateAnswerDto } from './dto/create-answer.dto';

import { ANSWER_SWAGGER } from './answer.constants';

@ApiTags(ANSWER_ROUTES.main)
@Controller(ANSWER_ROUTES.main)
export class AnswerController {
  constructor(private readonly answerService: AnswerService) {}

  @Post(ANSWER_ROUTES.create)
  @ApiOperation({ summary: ANSWER_SWAGGER.create })
  @ApiResponse({
    status: HttpStatus.OK,
    description: ANSWER_SWAGGER.create,
  })
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtAuthenticationGuard)
  public async create(
    @User('id') id: string,
    @Body() body: { answers: CreateAnswerDto[]; status: string }
  ) {
    return this.answerService.saveAnswers(id, body);
  }
}
