import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import * as swaggerUi from 'swagger-ui-dist';

async function bootstrap() {
  const config = new DocumentBuilder()
    .setLicense('MIT', 'https://opensource.org/licenses/MIT')
    .setTermsOfService('https://www.polgubau.com/terms')
    .addBearerAuth()
    .setTitle('Stickies API')
    .setDescription('The Stickies API description')
    .setVersion('0.1')
    .setContact('Pol', 'https://www.polgubau.com', 'gubaupol@gmail.com')
    .setBasePath('swagger')
    .build();

  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.useStaticAssets(join(__dirname, '..', 'public'));

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger', app, document, {
    swaggerOptions: {
      // Specify the URL to the Swagger UI distribution file
      url: '/api/swagger.json',
    },
    customCss: swaggerUi.getAbsoluteFSPath(),
    customJs: swaggerUi.getAbsoluteFSPath(),
  });

  await app.listen(3000);
}

bootstrap();
