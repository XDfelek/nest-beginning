import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import ConfigureSwagger from './utils/swagger-configuration';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  ConfigureSwagger(app);
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
