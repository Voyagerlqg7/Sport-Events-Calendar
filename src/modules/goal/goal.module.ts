import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CqrsModule } from '@nestjs/cqrs';
import { Goal } from './domain/goal.entity';
import { GoalRepository } from './infrastructure/goal.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Goal]), CqrsModule],
  controllers: [],
  providers: [GoalRepository],
  exports: [GoalRepository],
})
export class GoalModule {}
