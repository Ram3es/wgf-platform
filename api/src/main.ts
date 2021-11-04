import { json, urlencoded } from 'body-parser';
import * as rateLimit from 'express-rate-limit';
import * as helmet from 'helmet';
import { launch } from 'puppeteer-core';

import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory, Reflector } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { SWAGGER } from './constants/etc';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const puppeteer = require('puppeteer');

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });

  const config = new DocumentBuilder()
    .setTitle(SWAGGER.title)
    .setDescription(SWAGGER.description)
    .setVersion(SWAGGER.version)
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/docs', app, document);

  app.use(json({ limit: '10mb' }));
  app.use(urlencoded({ limit: '10mb', extended: true }));
  app.enableCors();

  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));
  app.use(helmet());

  app.use(
    rateLimit({
      windowMs: 60 * 1000, // 1 minute
      max: 100, // limit each IP to 100 requests per windowMs
    })
  );

  const configService = app.get(ConfigService);
  const PORT = configService.get('PORT');

  await app.listen(PORT || 8080);
}
bootstrap();

const createBrowser = async () => {
  return puppeteer.launch({
    headless: true,
    args: [
      '--disable-gpu',
      '--disable-dev-shm-usage',
      '--disable-setuid-sandbox',
      '--no-sandbox',
    ],
    defaultViewport: { width: 1600, height: 1500 },
  });
};

export const browser = createBrowser();
