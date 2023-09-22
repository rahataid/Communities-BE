// src/main.ts

import { VersioningType } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { json, urlencoded } from 'express';
import { PORT } from 'src/config';
import { AppModule } from './app.module';
import { RsExceptionFilter } from './utils/exceptions/rs-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors();

  // app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(new RsExceptionFilter());
  app.setGlobalPrefix('api').enableVersioning({
    type: VersioningType.URI,
    defaultVersion: '1',
  });
  app.use(json({ limit: '50mb' }));
  app.use(urlencoded({ extended: true, limit: '50mb' }));

  const config = new DocumentBuilder()
    .setTitle('Community Service')
    .setDescription('Rahat Community Management Service')
    .setVersion('0.1')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);

  console.log(`Listening on port ${PORT}...`);
  console.log(`Swagger UI: http://localhost:${PORT}/api/docs`);

  await app.listen(PORT);
}
bootstrap();
