import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as express from 'express';
import {
  SwaggerUIBundle,
  SwaggerUIStandalonePreset,
  getAbsoluteFSPath,
} from 'swagger-ui-dist';

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

  // Serve Swagger UI from the `public` folder
  app.use('/swagger', express.static(getAbsoluteFSPath()));

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger', app, document);

  // Custom route to serve Swagger UI HTML
  app.get('/', (_req, res) => {
    const swaggerHtml = SwaggerUIBundle({
      url: '/swagger-json',
      presets: [SwaggerUIStandalonePreset],
    });
    res.send(swaggerHtml);
  });

  await app.listen(3000);
}
bootstrap();
