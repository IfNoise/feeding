import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { Logger } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const logger = new Logger('Bootstrap');
  const app = await NestFactory.create(AppModule, {
    snapshot: true,
    logger: ['error', 'warn', 'log', 'debug', 'verbose'],
  });
  const options = new DocumentBuilder()
    .setTitle('Feeding Service')
    .setDescription('The plants farm feeding management Restful API service')
    .setVersion('1.0')
    .addTag('feeding')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);
  app.enableCors();
  app.setGlobalPrefix('api/v1/feeding');
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  await app.listen(3000);
  logger.log('Application is running on: http://localhost:3000');
}
bootstrap();
