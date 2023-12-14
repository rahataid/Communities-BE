/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { json, urlencoded } from 'express';

import { AppModule } from './app/app.module';
import { RsExceptionFilter } from './app/utils/exceptions/rs-exception.filter';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { PORT } from './app/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();

  app.useGlobalFilters(new RsExceptionFilter());

  app.use(json({ limit: '50mb' }));
  app.use(urlencoded({ extended: true, limit: '50mb' }));
  const globalPrefix = 'api/v1';
  app.setGlobalPrefix(globalPrefix);

  const config = new DocumentBuilder()
    .setTitle('Community Service')
    .setDescription('Rahat Community Management Service')
    .setVersion('0.1')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);

  await app.listen(PORT);
  Logger.log(
    `🚀 Application is running on: http://localhost:${PORT}/${globalPrefix}`
  );
  Logger.log(`Swagger UI: http://localhost:${PORT}/api/docs`);
}

bootstrap();
