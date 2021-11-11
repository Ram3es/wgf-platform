import { Body, Controller, HttpCode, HttpStatus, Post, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { RoleGuard } from '../shared/guards/role.guard';
import { AddQuestionToQuizDto } from './dto/add-question-quiz.dto';
import { CreateAnswerOptionDto } from './dto/create-answer-option.dto';
import { CreateQuestionDto } from './dto/create-question.dto';
import { QuestionEntity } from './entities/question.entity';
import { QuestionService } from './question.service';

import { QUESTION_ROUTES } from './question.constants';

@ApiTags(QUESTION_ROUTES.main)
@Controller(QUESTION_ROUTES.main)
export class QuestionController {
  constructor(private readonly questionService: QuestionService) {}

  @Post(QUESTION_ROUTES.create)
  @ApiOperation({ summary: QUESTION_ROUTES.create })
  @ApiResponse({
    status: HttpStatus.OK,
    description: QUESTION_ROUTES.create,
    isArray: true,
    type: QuestionEntity,
  })
  @HttpCode(HttpStatus.OK)
  @UseGuards(new RoleGuard(['superAdmin']))
  public async createQuestion(@Body() body: CreateQuestionDto) {
    return this.questionService.createQuestion(body);
  }

  @Post(QUESTION_ROUTES.addToQuiz)
  @ApiOperation({ summary: QUESTION_ROUTES.addToQuiz })
  @ApiResponse({
    status: HttpStatus.OK,
    description: QUESTION_ROUTES.addToQuiz,
    isArray: true,
    type: QuestionEntity,
  })
  @HttpCode(HttpStatus.OK)
  @UseGuards(new RoleGuard(['superAdmin']))
  public async addQuestionToQuiz(@Body() body: AddQuestionToQuizDto) {
    return this.questionService.addQuestionToQuiz(body);
  }
  @Post(QUESTION_ROUTES.createAnswerOption)
  @ApiOperation({ summary: QUESTION_ROUTES.createAnswerOption })
  @ApiResponse({
    status: HttpStatus.OK,
    description: QUESTION_ROUTES.createAnswerOption,
    isArray: true,
    type: QuestionEntity,
  })
  @HttpCode(HttpStatus.OK)
  @UseGuards(new RoleGuard(['superAdmin']))
  public async createAnswerOption(@Body() body: CreateAnswerOptionDto) {
    return this.questionService.createAnswerOption(body);
  }
}
