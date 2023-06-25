// src/main.ts

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

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

  const app = await NestFactory.create(AppModule);

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger', app, document);

  await app.listen(3000);
}
bootstrap();
