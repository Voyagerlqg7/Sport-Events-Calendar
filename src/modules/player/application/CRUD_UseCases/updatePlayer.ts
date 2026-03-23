import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { PlayerRepository } from '../../infrastructure/player.repository';
import { TeamRepository } from '../../../team/infrastructure/team.repository';
import { PlayerViewDto } from '../../api/view-dto/player.view-dto';
import { UpdatePlayerDomainDto } from '../../domain/domainDto/playerDomainDto';
import { DomainException } from '../../../../core/exceptions/domain.exceptions';

export class UpdatePlayerCommand {
  constructor(
    public playerId: string,
    public dto: UpdatePlayerDomainDto,
  ) {}
}

@CommandHandler(UpdatePlayerCommand)
export class UpdatePlayerUseCase implements ICommandHandler<
  UpdatePlayerCommand,
  PlayerViewDto
> {
  constructor(
    private readonly playerRepository: PlayerRepository,
    private readonly teamRepository: TeamRepository,
  ) {}

  async execute({
    playerId,
    dto,
  }: UpdatePlayerCommand): Promise<PlayerViewDto> {
    const player = await this.playerRepository.findById(playerId);

    if (!player) {
      throw DomainException.notFound('Player', 'Update player failed');
    }

    if (dto.teamId) {
      const team = await this.teamRepository.findById(dto.teamId);
      if (!team) {
        throw DomainException.notFound('Team', 'Update player failed');
      }
    }

    player.update(dto);
    const savedPlayer = await this.playerRepository.save(player);

    return PlayerViewDto.mapToView(savedPlayer);
  }
}
