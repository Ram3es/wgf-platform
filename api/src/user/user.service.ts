import { unlinkSync } from 'fs';
import { createTransport } from 'nodemailer';
import { join } from 'path';
import { launch } from 'puppeteer';
import { Repository } from 'typeorm';

import * as aws from '@aws-sdk/client-ses';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto, IAnswer } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { QuizAnswerEntity } from './entities/quiz-answer.entity';
import { UserEntity } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    @InjectRepository(QuizAnswerEntity)
    private readonly quizRepository: Repository<QuizAnswerEntity>
  ) {}

  async createUser(createUserDto: CreateUserDto): Promise<any> {
    try {
      const user = await this.userRepository.findOne({
        where: {
          email: createUserDto.email,
        },
      });

      if (user) {
        await this.removeUser(user.id);
      }

      const newUser = await this.userRepository.save(createUserDto);
      createUserDto.answers.forEach(async (answer) => {
        await this.quizRepository.save({ ...answer, user: newUser });
      });
      return {
        user: newUser,
        results: this.getResultCalculationAtributes(createUserDto.answers),
      };
    } catch {
      throw new HttpException('Can not save User', HttpStatus.BAD_REQUEST);
    }
  }

  async getUsers(): Promise<UserEntity[]> {
    return this.userRepository.find();
  }

  async getUserById(id: string): Promise<UserEntity> {
    const user = await this.userRepository.findOne({
      where: {
        id,
      },
      relations: ['answers'],
    });
    if (!user) {
      throw new HttpException(
        'User with this id does not exist',
        HttpStatus.NOT_FOUND
      );
    }
    return user;
  }

  async removeUser(id: string): Promise<UserEntity> {
    const user = await this.getUserById(id);
    await this.userRepository.delete(id);
    return user;
  }

  async updateUser(
    id: string,
    updateUserDto: UpdateUserDto
  ): Promise<UserEntity> {
    await this.userRepository.update(id, updateUserDto);
    return this.getUserById(id);
  }

  getResultCalculationAtributes(answers: IAnswer[]) {
    const concernQuestionsNumber = answers.slice(0, 6);
    const controlQuestionsNumber = answers.slice(6, 12);
    const curiosityQuestionsNumber = answers.slice(12, 18);
    const confidenceQuestionsNumber = answers.slice(18, 24);
    const cooperationQuestionsNumber = answers.slice(24, 35);

    return {
      concern: this.getScoreOfAtribute(concernQuestionsNumber),
      control: this.getScoreOfAtribute(controlQuestionsNumber),
      curiosity: this.getScoreOfAtribute(curiosityQuestionsNumber),
      confidence: this.getScoreOfAtribute(confidenceQuestionsNumber),
      cooperation: this.getScoreOfAtribute(cooperationQuestionsNumber),
    };
  }

  getScoreOfAtribute(atributeAnswers: IAnswer[]) {
    const score = atributeAnswers.reduce(
      (acc, item) => acc + item.answerValue,
      0
    );

    return {
      score,
      level: this.getLevelOfAtribute(score, atributeAnswers),
    };
  }

  getLevelOfAtribute(score: number, atribute: IAnswer[]) {
    const maxScore = atribute.length * 5;

    const scorePercent = (score / maxScore) * 100;

    if (scorePercent >= 67) {
      return 'High';
    }

    if (scorePercent >= 34) {
      return 'Moderate';
    }

    return 'Low';
  }

  async getPdf(id: string) {
    try {
      const user = await this.getUserById(id);

      const file = `results-${id}-${Date.now()}.pdf`;
      const browser = await launch({
        headless: true,
        args: ['--no-sandbox', '--disable-setuid-sandbox'],
        defaultViewport: { width: 1600, height: 1500 },
      });

      const page = await browser.newPage();

      await page.goto(this.getPdfPageUrl(user), {
        waitUntil: 'networkidle2',
        timeout: 5000,
      });
      const pdf = await page.pdf({
        printBackground: true,
        path: `pdf/${file}`,
        format: 'a4',
        scale: 0.5,
      });
      const base64 = pdf.toString('base64');

      await browser.close();

      setTimeout(() => {
        unlinkSync(join(process.cwd(), 'pdf', file));
      }, 20000);

      await this.sendMail(user, base64);

      return { file };
    } catch (e) {
      console.log(e);
      throw new HttpException('Can not create Pdf', HttpStatus.BAD_REQUEST);
    }
  }

  async sendMail(user: UserEntity, pdf: string) {
    const ses = new aws.SES({
      region: 'us-east-2',
    });

    const transporter = createTransport({
      SES: { ses, aws },
    });

    const message = {
      from: 'Avid Quiz <mzorin@codempire.team>',

      to: `${user.firstName} ${user.lastName}<${user.email}>`,
      bcc: user.email,

      subject: 'Avid Quiz result',

      text: 'Hello to myself!',

      html: '<p><b>Hello</b> to myself</p>',

      attachments: [
        {
          filename: `results.pdf`,
          content: pdf,
          encoding: 'base64',
        },
      ],
    };

    await transporter.sendMail(message);
  }

  getPdfPageUrl(user: UserEntity) {
    const sortedUserAnswers = user.answers.sort(
      (a, b) => a.questionNumber - b.questionNumber
    );
    const { concern, confidence, curiosity, control, cooperation } =
      this.getResultCalculationAtributes(sortedUserAnswers);

    const QUERIES = [
      `name=${user.firstName}`,
      `concern_level=${concern.level}`,
      `concern_score=${concern.score}`,
      `confidence_level=${confidence.level}`,
      `confidence_score=${confidence.score}`,
      `curiosity_level=${curiosity.level}`,
      `curiosity_score=${curiosity.score}`,
      `control_level=${control.level}`,
      `control_score=${control.score}`,
      `cooperation_level=${cooperation.level}`,
      `cooperation_score=${cooperation.score}`,
    ];

    return `http://18.118.40.166/pdf?${QUERIES.join('&')}`;
  }
}
