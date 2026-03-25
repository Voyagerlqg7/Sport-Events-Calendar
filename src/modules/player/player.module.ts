import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CqrsModule } from '@nestjs/cqrs';
import { Player } from './domain/player.entity';
import { PlayerRepository } from './infrastructure/player.repository';
import { PlayerController } from './api/player.controller';

// CRUD Use Cases
import { CreatePlayerUseCase } from './application/CRUD_UseCases/createPlayer';
import { UpdatePlayerUseCase } from './application/CRUD_UseCases/updatePlayer';
import { DeletePlayerUseCase } from './application/CRUD_UseCases/deletePlayer';
import { GetPlayerUseCase } from './application/CRUD_UseCases/getPlayer';

// Import TeamModule
import { TeamModule } from '../team/team.module';

@Module({
  imports: [TypeOrmModule.forFeature([Player]), CqrsModule, TeamModule],
  controllers: [PlayerController],
  providers: [
    PlayerRepository,
    CreatePlayerUseCase,
    UpdatePlayerUseCase,
    DeletePlayerUseCase,
    GetPlayerUseCase,
  ],
  exports: [PlayerRepository],
})
export class PlayerModule {}
