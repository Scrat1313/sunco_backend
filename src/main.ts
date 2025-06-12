// src/main.ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // Swagger
  const config = new DocumentBuilder()
    .setTitle('Backend API Sun CO.')
    .setDescription('Documentation générée par Swagger')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  // Sert le dossier "upload" statiquement
  app.useStaticAssets(join(__dirname, '..', 'upload'), {
    prefix: '/upload/',
  });

  await app.listen(3000);
}
bootstrap();
