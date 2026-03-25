import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CqrsModule } from '@nestjs/cqrs';
import { Match } from './domain/match.entity';
import { MatchRepository } from './infrastructure/match.repository';
import { MatchController } from './api/match.controller';

// CRUD Use Cases
import { GetMatchCommand } from './application/CRUD_UseCases/getMatch';
import { UpdateMatchCommand } from './application/CRUD_UseCases/updateMatch';
import { DeleteMatchCommand } from './application/CRUD_UseCases/deleteMatch';

// Business Use Cases
import { AddGoalToMatchUseCase } from './application/BusinessUseCases/add-goal-to-match.use-case';
import { AddCardToMatchUseCase } from './application/BusinessUseCases/add-card-to-match.use-case';
import { UpdateMatchResultUseCase } from './application/BusinessUseCases/update-match-result.use-case';

// Import dependent modules
import { TeamModule } from '../team/team.module';
import { PlayerModule } from '../player/player.module';
import { ResultModule } from '../result/result.module';
import { GoalModule } from '../goal/goal.module';
import { CardModule } from '../cards/cards.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Match]),
    CqrsModule,
    TeamModule,
    PlayerModule,
    ResultModule,
    GoalModule,
    CardModule,
  ],
  controllers: [MatchController],
  providers: [
    MatchRepository,
    // CRUD
    GetMatchCommand,
    UpdateMatchCommand,
    DeleteMatchCommand,
    // Business
    AddGoalToMatchUseCase,
    AddCardToMatchUseCase,
    UpdateMatchResultUseCase,
  ],
  exports: [MatchRepository],
})
export class MatchModule {}
