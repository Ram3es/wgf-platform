import { Repository } from 'typeorm';

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { QuizEntity } from 'src/quiz/entities/quiz.entity';
import { AddQuestionToQuizDto } from './dto/add-question-quiz.dto';
import { CreateQuestionDto } from './dto/create-question.dto';
import { QuestionEntity } from './entities/question.entity';

@Injectable()
export class QuestionService {
  constructor(
    @InjectRepository(QuestionEntity)
    private readonly questionRepository: Repository<QuestionEntity>,
    @InjectRepository(QuizEntity)
    private readonly quizRepository: Repository<QuizEntity>
  ) {}

  async createQuestion(body: CreateQuestionDto) {
    const quizes = await this.quizRepository.findByIds(body.quizesId);

    const answerOptions = await this.quizRepository.findByIds(
      body.answerOptionsId ?? []
    );

    return this.questionRepository.save({
      title: body.title,
      order: body.order,
      type: body.type,
      category: body.category,
      quizes,
      answerOptions,
    });
  }

  async addQuestionToQuiz(body: AddQuestionToQuizDto) {
    const sets = await this.quizRepository.findByIds(body.quizesId);

    const answerOptions = await this.quizRepository.findByIds(
      body.answerOptionsId
    );

    return this.questionRepository.save({
      sets,
      answerOptions,
    });
  }
}
