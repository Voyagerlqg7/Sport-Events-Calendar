import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe, BadRequestException } from '@nestjs/common';
import { join } from 'path';
import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // BAAAAASSSEEEEEE Swagger setup
  const config = new DocumentBuilder()
    .setTitle('Sports Event Calendar API')
    .setDescription(
      'API for managing sports competitions, stages, matches, teams, and players',
    )
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, document);

  // Validation pipe
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      exceptionFactory: (errors) => {
        const errorMessages = errors.map((error) => ({
          message: Object.values(error.constraints || {}).join(', '),
          field: error.property,
        }));

        return new BadRequestException({
          errorsMessages: errorMessages,
        });
      },
    }),
  );

  app.useStaticAssets(join(__dirname, '..', 'public'));

  const port = process.env.PORT || 7686;
  await app.listen(port);
  console.log(`Application running on: http://localhost:${port}`);
  console.log(`Swagger documentation: http://localhost:${port}/api-docs`);
}

bootstrap();
