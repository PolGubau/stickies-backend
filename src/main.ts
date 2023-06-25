// src/main.ts

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setLicense('MIT', 'https://opensource.org/licenses/MIT')
    .setTermsOfService('https://www.polgubau.com/terms')
    .addBearerAuth()
    .setTitle('Stickies API')
    .setDescription('The Stickies API description')
    .setVersion('0.1')
    .setContact('Pol', 'https://www.polgubau.com', 'gubaupol@gmail.com')

    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('', app, document);

  await app.listen(3000);
}
bootstrap();
