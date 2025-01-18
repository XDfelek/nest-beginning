import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { SwaggerTheme, SwaggerThemeNameEnum } from 'swagger-themes';

const ConfigureSwagger = (app: INestApplication<any>) => {
  const cfg = new DocumentBuilder()
    .setTitle('Eventor API')
    .setDescription('desc')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, cfg);
  const theme = new SwaggerTheme();
  const options = {
    explorer: true,
    customCss: theme.getBuffer(SwaggerThemeNameEnum.DARK),
    swaggerOptions: {
      persistAuthorization: true,
    },
  };
  SwaggerModule.setup('swagger', app, document, options);
};

export default ConfigureSwagger;
