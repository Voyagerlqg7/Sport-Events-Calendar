import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CqrsModule } from '@nestjs/cqrs';
import { Stage } from './domain/stage.entity';
import { StageRepository } from './infrastructure/stage.repository';
import { StageController } from './api/stage.controller';
import { forwardRef } from '@nestjs/common';

// CRUD Use Cases
import { GetStageUseCase } from './application/CRUD_UseCases/getStage';
import { UpdateStageUseCase } from './application/CRUD_UseCases/updateStage';
import { DeleteStageUseCase } from './application/CRUD_UseCases/deleteStage';

//Module
import { CompetitionModule } from '../competition/competition.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Stage]),
    CqrsModule,
    forwardRef(() => CompetitionModule), // <- forwardRef
  ],
  controllers: [StageController],
  providers: [
    StageRepository,
    GetStageUseCase,
    UpdateStageUseCase,
    DeleteStageUseCase,
  ],
  exports: [StageRepository],
})
export class StageModule {}
