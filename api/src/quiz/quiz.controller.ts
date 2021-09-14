import { Body, Controller, HttpCode, HttpStatus, Post, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { User } from 'src/decorators/user';
import JwtAuthenticationGuard from 'src/shared/guards/auth.guard';
import { getQuizDto } from './dto/get-quiz.dto';
import { getResultDto } from './dto/get-result-quiz.dto';
import { QuizEntity } from './entities/quiz.entity';
import { QuizService } from './quiz.service';

import { QUIZ_ROUTES } from './quiz.constants';

@ApiTags(QUIZ_ROUTES.main)
@Controller(QUIZ_ROUTES.main)
export class QuizController {
  constructor(private readonly quizService: QuizService) {}

  @Post(QUIZ_ROUTES.getQuestions)
  @ApiOperation({ summary: QUIZ_ROUTES.getQuestions })
  @ApiResponse({
    status: HttpStatus.OK,
    description: QUIZ_ROUTES.getQuestions,
    isArray: true,
    type: QuizEntity,
  })
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtAuthenticationGuard)
  public async create(@User('id') id: string, @Body() body: getQuizDto) {
    return this.quizService.getQuizQuestions(id, body.quizId);
  }

  @Post(QUIZ_ROUTES.getResult)
  @ApiOperation({ summary: QUIZ_ROUTES.getResult })
  @ApiResponse({
    status: HttpStatus.OK,
    description: QUIZ_ROUTES.getResult,
  })
  @HttpCode(HttpStatus.OK)
  public async getQuizResult(@Body() body: getResultDto) {
    return this.quizService.getQuizCaasResult(body);
  }

  @Post(QUIZ_ROUTES.getPdf)
  @ApiOperation({ summary: QUIZ_ROUTES.getPdf })
  @ApiResponse({
    status: HttpStatus.OK,
    description: QUIZ_ROUTES.getPdf,
  })
  @HttpCode(HttpStatus.OK)
  public async getPdf(@Body() body: getResultDto) {
    return this.quizService.getPdf(body);
  }
}