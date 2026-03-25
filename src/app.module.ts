import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CqrsModule } from '@nestjs/cqrs';
import { SportsEventsModule } from './modules/sports-events.module';
import { AppService } from './app.service';
import { APP_FILTER } from '@nestjs/core';
import { AllHttpExceptionsFilter } from './core/exceptions/filters/all-exceptions';
import { DomainHttpExceptionsFilter } from './core/exceptions/filters/domain.exception.filter';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        url: configService.get('DATABASE_LOCAL_URL'),
        entities: [__dirname + '/modules/**/domain/*.entity{.ts,.js}'],
        synchronize: true,
        dropSchema: process.env.NODE_ENV === 'development', // drops tables on start
        logging: true,
      }),
      inject: [ConfigService],
    }),
    CqrsModule,
    SportsEventsModule,
  ],
  providers: [
    AppService,
    {
      provide: APP_FILTER,
      useClass: AllHttpExceptionsFilter,
    },
    {
      provide: APP_FILTER,
      useClass: DomainHttpExceptionsFilter,
    },
  ],
})
export class AppModule {}
