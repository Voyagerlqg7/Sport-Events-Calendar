import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe, BadRequestException } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

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

  await app.listen(7686);
}

bootstrap();
