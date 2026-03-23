import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { PlayerRepository } from '../../infrastructure/player.repository';
import { PlayerViewDto } from '../../api/view-dto/player.view-dto';
import { DomainException } from '../../../../core/exceptions/domain.exceptions';

export class GetPlayerCommand {
  constructor(
    public playerId: string,
    public includeStats: boolean = false,
  ) {}
}

@CommandHandler(GetPlayerCommand)
export class GetPlayerUseCase implements ICommandHandler<
  GetPlayerCommand,
  PlayerViewDto
> {
  constructor(private readonly playerRepository: PlayerRepository) {}

  async execute(command: GetPlayerCommand): Promise<PlayerViewDto> {
    const player = await this.playerRepository.findByIdWithDetails(
      command.playerId,
    );

    if (!player) {
      throw DomainException.notFound('Player', 'Find a player by Id');
    }

    return PlayerViewDto.mapToView(player, command.includeStats);
  }
}
