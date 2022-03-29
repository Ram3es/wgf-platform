import { interestReducer } from './utils/interest-assessment';
import { ISortedObj, IState } from './constants';
import { AnswerEntity } from './../answer/entities/answer.entity';
import { getResultDto } from './../quiz/dto/get-result-quiz.dto';
import { AnswerService } from 'src/answer/answer.service';
import { CreateSubjectDto } from './dto/create-subject.dto';
import { SubjectEntity } from './entities/subject.entity';
import { ERRORS } from 'src/constants/errors';
import { StreamEntity } from './entities/stream.entity';
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateStreamDto } from './dto/create-stream.dto';
import {
  getHighScore,
  personalityReducer,
} from './utils/personality-assessment';
import {
  calcFinallResult,
  scoreSubcategory,
  sumSectionsResult,
  TResultSection,
} from './utils/common';
import {
  aptitudeReducer,
  getScoreApptitude,
} from './utils/aptitude-assessment';

@Injectable()
export class SainaService {
  constructor(
    @InjectRepository(StreamEntity)
    private readonly streamRepository: Repository<StreamEntity>,
    @InjectRepository(SubjectEntity)
    private readonly subjectRepository: Repository<SubjectEntity>,
    private readonly answerService: AnswerService
  ) {}

  async createStream(dto: CreateStreamDto) {
    const stream = await this.streamRepository.findOne({ stream: dto.stream });

    if (stream) {
      throw new HttpException(ERRORS.alreadyExist, HttpStatus.BAD_REQUEST);
    }
    return await this.streamRepository.save(dto);
  }
  async createSubject(dto: CreateSubjectDto) {
    const subject = await this.subjectRepository.findOne({ title: dto.title });

    if (subject) {
      throw new HttpException(ERRORS.alreadyExist, HttpStatus.BAD_REQUEST);
    }
    const stream = await this.streamRepository.findByIds(dto.streamIds);

    return await this.subjectRepository.save({ ...dto, streamIds: stream });
  }

  async getAllSainaResult(body: getResultDto) {
    const answers = await this.answerService.getQuizAnswersByUserId(
      body.quizId,
      body.userId
    );

    const answersOption: SubjectEntity[] = await this.subjectRepository
      .createQueryBuilder('subject')
      .leftJoinAndSelect('subject.streamIds', 'streamIds')
      .getMany();

    const answersBySection: { [key: string]: AnswerEntity[] } = {};

    answers.forEach((answer) => {
      if (!answersBySection[answer.question.section]) {
        answersBySection[answer.question.section] = [];
      }
      answersBySection[answer.question.section].push(answer);
    });

    const dataInterest: TResultSection[] = interestReducer(
      answersBySection.Section1,
      answersOption
    );
    const dataPersonality: TResultSection[] = this.resultPersonalAssessment(
      answersBySection.Section2
    );
    const dataAptitude = this.resultAptitudeAssessment(
      answersBySection.Section3
    );
    const allSectionsData: IState = sumSectionsResult(
      dataPersonality,
      dataAptitude,
      dataInterest
    );

    const finalScore = calcFinallResult(allSectionsData);

    return {
      dataInterest,
      dataPersonality,
      dataAptitude,
      allSectionsData,
      finalScore,
    };
  }

  private resultPersonalAssessment(answers: AnswerEntity[]) {
    const subCategObj: ISortedObj[] = scoreSubcategory(answers);
    const highScore = getHighScore(subCategObj);

    return personalityReducer(highScore);
  }

  private resultAptitudeAssessment(answers: AnswerEntity[]) {
    const subCategObj: ISortedObj[] = scoreSubcategory(answers);
    const highScore = getScoreApptitude(subCategObj);

    return aptitudeReducer(highScore);
  }
}
