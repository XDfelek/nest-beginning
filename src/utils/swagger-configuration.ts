import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

const ConfigureSwagger = (app: INestApplication<any>) => {
  const config = new DocumentBuilder()
    .setTitle('Starter API')
    .setVersion('1.0')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger', app, documentFactory);
};

export default ConfigureSwagger;
