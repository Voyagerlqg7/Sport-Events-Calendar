import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CqrsModule } from '@nestjs/cqrs';
import { Result } from './domain/result.entity';
import { ResultRepository } from './infrastructure/results.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Result]), CqrsModule],
  controllers: [],
  providers: [ResultRepository],
  exports: [ResultRepository],
})
export class ResultModule {}
