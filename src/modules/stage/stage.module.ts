import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CqrsModule } from '@nestjs/cqrs';
import { Stage } from './domain/stage.entity';
import { StageRepository } from './infrastructure/stage.repository';
import { StageController } from './api/stage.controller';

// CRUD Use Cases
import { GetStageUseCase } from './application/CRUD_UseCases/getStage';
import { UpdateStageUseCase } from './application/CRUD_UseCases/updateStage';
import { DeleteStageUseCase } from './application/CRUD_UseCases/deleteStage';

@Module({
  imports: [TypeOrmModule.forFeature([Stage]), CqrsModule],
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
