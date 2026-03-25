// modules/team/team.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CqrsModule } from '@nestjs/cqrs';
import { Team } from './domain/team.entity';
import { TeamRepository } from './infrastructure/team.repository';
import { TeamController } from './api/team.controller';

// CRUD Use Cases
import { CreateTeamUseCase } from './application/CRUD_UseCases/createTeam';
import { UpdateTeamUseCase } from './application/CRUD_UseCases/updateTeam';
import { DeleteTeamUseCase } from './application/CRUD_UseCases/deleteTeam';
import { GetTeamUseCase } from './application/CRUD_UseCases/getTeam';

@Module({
  imports: [TypeOrmModule.forFeature([Team]), CqrsModule],
  controllers: [TeamController],
  providers: [
    TeamRepository,
    CreateTeamUseCase,
    UpdateTeamUseCase,
    DeleteTeamUseCase,
    GetTeamUseCase,
  ],
  exports: [TeamRepository],
})
export class TeamModule {}
