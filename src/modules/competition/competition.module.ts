import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CqrsModule } from '@nestjs/cqrs';
import { Competition } from './domain/competition.entity';
import { CompetitionRepository } from './infrastructure/competition.repository';
import { CompetitionController } from './api/competition.controller';

// CRUD Use Cases
import { CreateCompetitionUseCase } from './application/CRUD_UseCases/create-competition.usecase';
import { UpdateCompetitionUseCase } from './application/CRUD_UseCases/update-competition.usecase';
import { DeleteCompetitionUseCase } from './application/CRUD_UseCases/delete-competition.usecase';
import { GetCompetitionUseCase } from './application/CRUD_UseCases/get-competition.usecase';

// Business Use Cases
import { CreateStagesForCompetitionUseCase } from './application/BusinessUseCase/create-stages-for-competition.usecase';
import { CreateMatchesForStagesUseCase } from './application/BusinessUseCase/create-matches-for-stages.usecase';
import { GetCompetitionByOriginIdUseCase } from './application/BusinessUseCase/get-competition-by-origin-id.usecase';
import { GetCompetitionWithStagesAndMatchesUseCase } from './application/BusinessUseCase/get-competition-with-stages-and-matches-use.case';
import { GetCompetitionFullDetailsQuery } from './application/BusinessUseCase/get-competition-with-matches-and-teams.usecase';
import { GetCompetitionsUseCase } from './application/BusinessUseCase/get-competitions.usecase';
import { GetCompetitionWithStagesQueryCommand } from './application/BusinessUseCase/get-competitions-with-stages.usecase';
// Import StageModule
import { StageModule } from '../stage/stage.module';
import { MatchModule } from '../match/match.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Competition]),
    CqrsModule,
    StageModule,
    MatchModule,
  ],
  controllers: [CompetitionController],
  providers: [
    CompetitionRepository,
    // CRUD
    CreateCompetitionUseCase,
    UpdateCompetitionUseCase,
    DeleteCompetitionUseCase,
    GetCompetitionUseCase,
    // Business
    CreateStagesForCompetitionUseCase,
    CreateMatchesForStagesUseCase,
    GetCompetitionByOriginIdUseCase,
    GetCompetitionFullDetailsQuery,
    GetCompetitionWithStagesAndMatchesUseCase,
    GetCompetitionWithStagesQueryCommand,
    GetCompetitionsUseCase,
  ],
  exports: [CompetitionRepository],
})
export class CompetitionModule {}
