import { Repository } from 'typeorm';

import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { AnswerService } from 'src/answer/answer.service';
import { ERRORS } from 'src/constants/errors';
import { sendMail } from 'src/services/utils/email';
import { quizMessage } from 'src/services/utils/messages';
import { createPdf } from 'src/services/utils/pdf';
import { UserEntity } from 'src/user/entities/user.entity';
import { UserService } from 'src/user/user.service';
import { getResultDto } from './dto/get-result-quiz.dto';
import { QuizEntity } from './entities/quiz.entity';

import { categoryLevelPercent, ICategoryObj } from './quiz.constants';

@Injectable()
export class QuizService {
  constructor(
    @InjectRepository(QuizEntity)
    private readonly quizRepository: Repository<QuizEntity>,
    private readonly answerService: AnswerService,
    private readonly userService: UserService,
    private readonly configService: ConfigService
  ) {}

  async getQuizQuestions(userId: string, quizId: string) {
    await this.userService.getUserById(userId);
    const quiz = await this.quizRepository.findOne(quizId);

    if (!quiz) {
      return new HttpException(ERRORS.notFound, HttpStatus.NOT_FOUND);
    }

    return this.quizRepository
      .createQueryBuilder('quiz')
      .leftJoinAndSelect('quiz.questions', 'question')
      .leftJoinAndSelect(
        'question.answers',
        'answer',
        'answer.userId = (:userId) AND answer.quizId = (:quizId)',
        {
          userId,
          quizId,
        }
      )
      .where('quiz.id = (:quizId)', { quizId })
      .getOne();
  }

  async getQuizCaasResult(body: getResultDto) {
    const answers = await this.answerService.getQuizAnswersByUserId(
      body.quizId,
      body.userId
    );

    const categoriesObj = answers.reduce((acc: ICategoryObj, val) => {
      const { category } = val.question;
      if (acc[category]) {
        acc[category].score += +val.value;
        acc[category].count++;
      } else {
        acc[category] = {
          score: +val.value,
          count: 1,
        };
      }
      return acc;
    }, {});

    return Object.fromEntries(
      Object.entries(categoriesObj).map(([category, value]) => {
        const score = +((value.score / (value.count * 5)) * 100).toFixed(2);

        const obj = {
          level: this.getLevelOfCategory(score, category),
          score: Math.round(score),
        };
        return [category, obj];
      })
    );
  }

  getLevelOfCategory(score: number, category: string) {
    if (score >= categoryLevelPercent[category].High) {
      return 'High';
    }

    if (score >= categoryLevelPercent[category].Moderate) {
      return 'Moderate';
    }

    return 'Low';
  }

  async getPdf(body: { userId: string; quizId: string }) {
    const user = await this.userService.getUserById(body.userId);

    const quiz = await this.quizRepository.findOne(body.quizId);

    if (!quiz) {
      throw new HttpException(ERRORS.notFound, HttpStatus.NOT_FOUND);
    }

    const WEB_BASE_URL = await this.configService.get('WEB_BASE_URL');

    let url = '';

    if (quiz.title === 'caas-quiz' || quiz.title === 'caas-cooperation-quiz') {
      url = this.getPdfPageUrl(user, quiz);
    } else {
      url = `${WEB_BASE_URL}${quiz.title}/pdf?id=${body.userId}`;
    }

    const file = `${user.firstName}-${quiz.title}-results-${user.id}.pdf`;

    const base64 = await createPdf(user, file, url);

    sendMail(user, quizMessage[quiz.title], base64);

    return { file };
  }

  getPdfPageUrl(user: UserEntity, quiz: QuizEntity) {
    const QUERIES = [
      `userName=${user.firstName}`,
      `userId=${user.id}`,
      `quizId=${quiz.id}`,
      `quizTitle=${quiz.title}`,
    ];

    return `${this.configService.get(
      'WEB_BASE_URL'
    )}caas-quiz/pdf?${QUERIES.join('&')}`;
  }
}