import 'reflect-metadata';

import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';
import ConfigureSwagger from './utils/swagger-configuration';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  ConfigureSwagger(app);
  app.useGlobalPipes(new ValidationPipe());

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
