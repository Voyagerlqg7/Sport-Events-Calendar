import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { BadRequestException } from '@nestjs/common';
import { PlayerRepository } from '../../infrastructure/player.repository';
import { TeamRepository } from '../../../team/infrastructure/team.repository';
import { Player } from '../../domain/player.entity';
import { PlayerViewDto } from '../../api/view-dto/player.view-dto';
import { CreatePlayersDto } from '../../dto/playerDto';

export class CreatePlayerCommand {
  constructor(public dto: CreatePlayersDto) {}
}

@CommandHandler(CreatePlayerCommand)
export class CreatePlayerUseCase implements ICommandHandler<
  CreatePlayerCommand,
  PlayerViewDto[]
> {
  constructor(
    private readonly playerRepository: PlayerRepository,
    private readonly teamRepository: TeamRepository,
  ) {}

  async execute({ dto }: CreatePlayerCommand): Promise<PlayerViewDto[]> {
    const teamIds = dto.players
      .map((player) => player.teamId)
      .filter((id): id is string => id !== null && id !== undefined);

    if (teamIds.length > 0) {
      const existingTeams = await this.teamRepository.findByIds(teamIds);
      const existingTeamIds = new Set(existingTeams.map((team) => team.id));

      const missingTeamIds = teamIds.filter((id) => !existingTeamIds.has(id));

      if (missingTeamIds.length > 0) {
        throw new BadRequestException(
          `Teams with ids [${missingTeamIds.join(', ')}] do not exist`,
        );
      }
    }

    const players = dto.players.map((playerDto) =>
      Player.createInstance({
        ...playerDto,
      }),
    );
    const savedPlayers = await this.playerRepository.saveMany(players);
    return savedPlayers.map((player) => PlayerViewDto.mapToView(player));
  }
}
