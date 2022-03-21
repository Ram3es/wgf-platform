import { AnswerTestEntity } from './entities/answer-test.entity';
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { QuizEntity } from 'src/quiz/entities/quiz.entity';
import { AddQuestionToQuizDto } from './dto/add-question-quiz.dto';
import { CreateAnswerOptionDto } from './dto/create-answer-option.dto';
import { CreateQuestionDto } from './dto/create-question.dto';
import { AnswerOptionEntity } from './entities/answer-option.entity';
import { QuestionEntity } from './entities/question.entity';
import { CreateTestAnswerDto } from './dto/create-test-answer.dto';

@Injectable()
export class QuestionService {
  constructor(
    @InjectRepository(QuestionEntity)
    private readonly questionRepository: Repository<QuestionEntity>,
    @InjectRepository(QuizEntity)
    private readonly quizRepository: Repository<QuizEntity>,
    @InjectRepository(AnswerOptionEntity)
    private readonly answerOptionRepository: Repository<AnswerOptionEntity>,
    @InjectRepository(AnswerTestEntity)
    private readonly answerTestRepository: Repository<AnswerTestEntity>
  ) {}

  async createQuestion(body: CreateQuestionDto) {
    const quizes = await this.quizRepository.findByIds(body.quizesId);

    const answerOptions = await this.answerOptionRepository.findByIds(
      body.answerOptionsId ?? []
    );
    const testAnswersOption = await this.answerTestRepository.findByIds(
      body.answerTestIds ?? []
    );
    return await this.questionRepository.save({
      ...body,
      quizes,
      answerOptions,
      testAnswers: testAnswersOption,
    });
  }

  async addQuestionToQuiz(body: AddQuestionToQuizDto) {
    const quizes = await this.quizRepository.findByIds(body.quizesId);

    const answerOptions = await this.answerOptionRepository.findByIds(
      body.answerOptionsId
    );

    return this.questionRepository.save({
      sets: quizes,
      answerOptions,
    });
  }

  async createAnswerOption(body: CreateAnswerOptionDto) {
    const questions = body.questionIds?.length
      ? await this.questionRepository.findByIds(body.questionIds)
      : [];

    return await this.answerOptionRepository.save({
      text: body.text,
      questions,
    });
  }
  async createTestAnswer(dto: CreateTestAnswerDto) {
    return await this.answerTestRepository.save({ ...dto });
  }

  async getQuestion(id: string) {
    const question = await this.questionRepository
      .createQueryBuilder('question')
      .where('question.id = (:id)', { id })
      .leftJoinAndSelect('question.testAnswers', 'test-answer')
      .getMany();

    return question;
  }
}
