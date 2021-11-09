import { Repository } from 'typeorm';

import { HttpService } from '@nestjs/axios';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { AnswerService } from 'src/answer/answer.service';
import { ERRORS } from 'src/constants/errors';
import { sendMail } from 'src/shared/utils/email';
import { quizMessage } from 'src/shared/utils/messages';
import { UserEntity } from 'src/user/entities/user.entity';
import { UserService } from 'src/user/user.service';
import { ResultEntity } from '../answer/entities/result.entity';
import { createCsvCaasQuiz } from '../shared/utils/csv-format';
import { getResultDto } from './dto/get-result-quiz.dto';
import { QuizEntity } from './entities/quiz.entity';

import { categoryLevelPercent, ICategoryObj } from './quiz.constants';

@Injectable()
export class QuizService {
  constructor(
    @InjectRepository(QuizEntity)
    private readonly quizRepository: Repository<QuizEntity>,
    @InjectRepository(ResultEntity)
    private readonly resultRepository: Repository<ResultEntity>,
    private readonly answerService: AnswerService,
    private readonly userService: UserService,
    private readonly configService: ConfigService,
    private readonly httpService: HttpService
  ) {}

  async getQuizQuestions(userId: string, quizId: string, resultId?: string) {
    await this.userService.getUserById(userId);
    const quiz = await this.quizRepository.findOne(quizId);

    if (!quiz) {
      throw new HttpException(ERRORS.notFound, HttpStatus.NOT_FOUND);
    }

    const lastResult = await this.answerService.getLastResult(userId, quizId);

    return this.quizRepository
      .createQueryBuilder('quiz')
      .leftJoinAndSelect('quiz.questions', 'question')
      .leftJoinAndSelect(
        'question.answers',
        'answer',
        'answer.resultId = (:resultId)',
        {
          resultId: resultId || lastResult?.id,
        }
      )
      .where('quiz.id = (:quizId)', { quizId })
      .getOne();
  }

  async getQuizCaasResult(body: getResultDto) {
    const answers = await this.answerService.getQuizAnswersByUserId(
      body.quizId,
      body.userId,
      body.resultId
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

    const fileName = `${user.firstName}-${quiz.title}-results-${user.id}.pdf`;

    const fullUrl = `https://ish6byobdk.execute-api.us-east-1.amazonaws.com/default/lambdaPuppeteer-dev-getPdfFile?url=${url}`;

    const { data } = await this.httpService.get(fullUrl).toPromise();

    const payload = quizMessage[quiz.title](user, data);

    sendMail(payload);

    return { file: data, name: fileName };
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
    )}caas-quiz/results?${QUERIES.join('&')}`;
  }

  async getCsv(body: { quizId: string }) {
    const data = await this.getUsersWithCompletedQuiz(body.quizId);

    if (!data) {
      throw new HttpException(ERRORS.notFound, HttpStatus.NOT_FOUND);
    }

    const users = await Promise.all(
      data.map(async (item) => {
        const quiz = await this.getQuizQuestions(
          item.user.id,
          body.quizId,
          item.id
        );

        const lastResult = await this.answerService.getLastResult(
          item.user.id,
          body.quizId
        );

        return {
          user: item.user,
          reportCreated: item.created,
          questions: quiz.questions,
          resultCategories: await this.getQuizCaasResult({
            userId: item.user.id,
            quizId: body.quizId,
            resultId: item.id,
          }),
          isLastResult: lastResult?.id === item.id,
        };
      })
    );

    const quiz = await this.quizRepository.findOne({
      where: {
        id: body.quizId,
      },
      relations: ['questions'],
    });

    return {
      file: await createCsvCaasQuiz(users, quiz.questions),
    };
  }

  async getUsersWithCompletedQuiz(quizId: string) {
    return this.resultRepository.find({
      where: {
        quiz: {
          id: quizId,
        },
        status: 'Completed',
      },
      relations: ['user'],
    });
  }
}
