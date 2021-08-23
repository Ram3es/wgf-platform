import { existsSync, unlinkSync } from 'fs';
import { createTransport } from 'nodemailer';
import { join } from 'path';
import { env } from 'process';
import { launch } from 'puppeteer';
import { Repository } from 'typeorm';

import * as aws from '@aws-sdk/client-ses';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto, IAnswer } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { CaasQuizAnswerEntity } from './entities/caas-quiz-answer.entity';
import { UserEntity } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    @InjectRepository(CaasQuizAnswerEntity)
    private readonly quizRepository: Repository<CaasQuizAnswerEntity>
  ) {}

  async createUser(createUserDto: CreateUserDto): Promise<any> {
    try {
      createUserDto = {
        ...createUserDto,
        email: createUserDto.email.toLowerCase(),
      };

      const user = await this.userRepository.findOne({
        where: {
          email: createUserDto.email,
        },
        relations: ['answers'],
      });

      if (user) {
        await this.updateUserAnswers(user, createUserDto.answers);
        const newUser = await this.updateUser(user.id, {
          firstName: createUserDto.firstName,
          lastName: createUserDto.lastName,
        });

        return {
          user: newUser,
          results: this.getResultCalculationAtributes(createUserDto.answers),
        };
      }

      const newUser = await this.userRepository.save(createUserDto);
      createUserDto.answers.forEach(async (answer) => {
        await this.quizRepository.save({ ...answer, user: newUser });
      });

      return {
        user: newUser,
        results: this.getResultCalculationAtributes(createUserDto.answers),
      };
    } catch (e) {
      throw new HttpException(e, HttpStatus.BAD_REQUEST);
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

  async updateUserAnswers(user: UserEntity, newAnswers: IAnswer[]) {
    await Promise.all(
      user.answers.map((answer) => {
        return this.quizRepository.delete(answer.id);
      })
    );

    const newUser = await this.getUserById(user.id);

    newAnswers.forEach(async (answer) => {
      await this.quizRepository.save({ ...answer, user: newUser });
    });
  }

  getResultCalculationAtributes(answers: IAnswer[]) {
    const concernQuestionsNumber = answers.slice(0, 6);
    const controlQuestionsNumber = answers.slice(6, 12);
    const curiosityQuestionsNumber = answers.slice(12, 18);
    const confidenceQuestionsNumber = answers.slice(18, 24);
    const cooperationQuestionsNumber = answers.slice(24, 35);

    return {
      concern: this.getScoreOfAtribute(concernQuestionsNumber, 'concern'),
      control: this.getScoreOfAtribute(controlQuestionsNumber, 'control'),
      curiosity: this.getScoreOfAtribute(curiosityQuestionsNumber, 'curiosity'),
      confidence: this.getScoreOfAtribute(
        confidenceQuestionsNumber,
        'confidence'
      ),
      cooperation: this.getScoreOfAtribute(
        cooperationQuestionsNumber,
        'cooperation'
      ),
    };
  }

  getScoreOfAtribute(atributeAnswers: IAnswer[], atributeName: string) {
    const score = atributeAnswers.reduce(
      (acc, item) => acc + item.answerValue,
      0
    );

    const maxScore = atributeAnswers.length * 5;

    const scorePercent = (score / maxScore) * 100;

    const scoreRound = Number.isInteger(scorePercent)
      ? scorePercent
      : scorePercent.toFixed(2);

    return {
      score: scoreRound,
      level: this.getLevelOfAtribute(+scoreRound, atributeName),
    };
  }

  getLevelOfAtribute(score: number, atribute: string) {
    const atributeLevelPercent = {
      concern: {
        High: 83,
        Moderate: 68.8,
      },
      control: {
        High: 85.1,
        Moderate: 72.1,
      },
      curiosity: {
        High: 81,
        Moderate: 66.9,
      },
      confidence: {
        High: 86,
        Moderate: 71.4,
      },
      cooperation: {
        High: 84.7,
        Moderate: 69,
      },
    };

    if (score >= atributeLevelPercent[atribute].High) {
      return 'High';
    }

    if (score >= atributeLevelPercent[atribute].Moderate) {
      return 'Moderate';
    }

    return 'Low';
  }

  async getPdf(id: string) {
    try {
      const user = await this.getUserById(id);
      const file = `${user.firstName}-quiz-results-${user.id}.pdf`;

      const browser = await launch({
        headless: true,
        args: ['--no-sandbox', '--disable-setuid-sandbox'],
        defaultViewport: { width: 1600, height: 1500 },
      });

      const page = await browser.newPage();

      await page.goto(this.getPdfPageUrl(user), {
        waitUntil: 'networkidle2',
        timeout: 15000,
      });

      const pdf = await page.pdf({
        printBackground: true,
        path: `${file}`,
        format: 'a4',
        scale: 0.5,
      });

      const base64 = pdf.toString('base64');

      await browser.close();

      setTimeout(() => {
        if (existsSync(join(process.cwd(), file))) {
          return unlinkSync(join(process.cwd(), file));
        }
      }, 20000);

      this.sendMail(user, base64);

      return { file };
    } catch (e) {
      return new HttpException(e.message, HttpStatus.BAD_REQUEST);
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
      from: `Avid Adventures <${env.EMAIL_ADRESS_FROM}>`,

      to: `${user.firstName} ${user.lastName}<${user.email}>`,
      bcc: user.email,

      subject: 'Quiz Completion',

      html: `
        <p>Hi <b>${user.firstName},</b></p>
        <p>Thanks for completing The Career Adapt-Abilities + Cooperation Assessment.</p>
        <p>You’re all set! Please refer to the attachment to view your results.</p>
        <p>Bests,<br/>Jac at Avid Adventures</p>
      `,

      attachments: [
        {
          filename: `${user.firstName}-${user.lastName}-quiz-results.pdf`,
          content: pdf,
          encoding: 'base64',
        },
      ],
    };

    try {
      await transporter.sendMail(message);
    } catch (e) {
      return new HttpException(e.message, HttpStatus.BAD_REQUEST);
    }
  }

  getPdfPageUrl(user: UserEntity) {
    const sortedUserAnswers = user.answers.sort(
      (a, b) => a.questionNumber - b.questionNumber
    );
    const { concern, confidence, curiosity, control, cooperation } =
      this.getResultCalculationAtributes(sortedUserAnswers);

    const QUERIES = [
      `firstName=${user.firstName}`,
      `lastName=${user.lastName}`,
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

    return `${env.WEB_BASE_URL}caas-quiz/pdf?${QUERIES.join('&')}`;
  }
}
