import { Repository } from 'typeorm';

import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ERRORS } from 'src/constants/errors';
import { QuestionEntity } from 'src/question/entities/question.entity';
import { QuizEntity } from 'src/quiz/entities/quiz.entity';
import { UserService } from 'src/user/user.service';
import { CreateAnswerDto } from './dto/create-answer.dto';
import { AnswerEntity } from './entities/answer.entity';
import { ResultEntity } from './entities/result.entity';

@Injectable()
export class AnswerService {
  constructor(
    @InjectRepository(AnswerEntity)
    private readonly answerRepository: Repository<AnswerEntity>,
    @InjectRepository(QuizEntity)
    private readonly quizRepository: Repository<QuizEntity>,
    @InjectRepository(ResultEntity)
    private readonly resultRepository: Repository<ResultEntity>,
    @InjectRepository(QuestionEntity)
    private readonly questionRepository: Repository<QuestionEntity>,
    private readonly userService: UserService
  ) {}
  async saveAnswers(
    userId: string,
    body: { answers: CreateAnswerDto[]; status: string }
  ) {
    const user = await this.userService.getUserById(userId);
    const quiz = await this.quizRepository.findOne(body.answers[0].quizId);

    const lastResult = await this.getLastResult(userId, quiz.id);

    if (lastResult && lastResult.status !== 'Completed') {
      await this.resultRepository.delete(lastResult.id);
    }

    const result = await this.resultRepository.save({
      user,
      quiz,
      status: body.status,
    });

    await Promise.all(
      body.answers.map(async (answer) => {
        const question = await this.questionRepository.findOne(
          answer.questionId
        );

        if (!quiz || !question) {
          throw new HttpException(ERRORS.notFound, HttpStatus.NOT_FOUND);
        }

        await this.answerRepository.save({
          value: answer.value,
          user,
          question,
          quiz,
          result,
        });
      })
    );

    return {
      message: 'Success',
    };
  }

  async getQuizAnswersByUserId(
    quizId: string,
    userId: string,
    resultId?: string
  ) {
    await this.userService.getUserById(userId);

    const lastResult = await this.getLastResult(userId, quizId);

    const answers = await this.answerRepository.find({
      where: {
        result: {
          id: resultId || lastResult.id,
        },
      },
      relations: ['question'],
    });

    return answers;
  }

  async getLastResult(userId: string, quizId: string) {
    const results = await this.resultRepository.find({
      where: {
        user: {
          id: userId,
        },
        quiz: {
          id: quizId,
        },
      },
    });

    return results.sort(
      (first, second) => second.created.getTime() - first.created.getTime()
    )[0];
  }
}
