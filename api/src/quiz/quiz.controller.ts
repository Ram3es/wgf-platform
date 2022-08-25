import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import JwtAuthenticationGuard from 'src/shared/guards/auth.guard';
import { RoleGuard } from 'src/shared/guards/role.guard';
import { getQuizDto } from './dto/get-quiz.dto';
import { getResultDto } from './dto/get-result-quiz.dto';
import { QuizEntity } from './entities/quiz.entity';
import { QuizService } from './quiz.service';
import { QUIZ_ROUTES } from './quiz.constants';
import { User } from 'src/decorators/user';
import { UserEntity } from 'src/user/entities/user.entity';

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
  public async getQuizQuestions(@Body() body: getQuizDto) {
    return this.quizService.getQuizQuestions(body);
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
  @UseGuards(JwtAuthenticationGuard)
  public async getPdf(@Body() body: getResultDto) {
    return this.quizService.getPdf(body);
  }

  @Post(QUIZ_ROUTES.getCaasCsv)
  @ApiOperation({ summary: QUIZ_ROUTES.getCaasCsv })
  @ApiResponse({
    status: HttpStatus.OK,
    description: QUIZ_ROUTES.getCaasCsv,
  })
  @HttpCode(HttpStatus.OK)
  @UseGuards(new RoleGuard(['superAdmin', 'trainerAdmin']))
  public async getCaasCsv(
    @Body() body: { quizId: string },
    @User() admin: UserEntity
  ) {
    return this.quizService.getCaasCsv(body, admin);
  }

  @Post(QUIZ_ROUTES.getCareerCanvasCsv)
  @ApiOperation({ summary: QUIZ_ROUTES.getCareerCanvasCsv })
  @ApiResponse({
    status: HttpStatus.OK,
    description: QUIZ_ROUTES.getCareerCanvasCsv,
  })
  @HttpCode(HttpStatus.OK)
  @UseGuards(new RoleGuard(['superAdmin', 'trainerAdmin']))
  public async getCareerCanvasCsv(
    @Body() body: { quizId: string },
    @User() admin: UserEntity
  ) {
    return this.quizService.getCareerCanvasCsv(body, admin);
  }
}
