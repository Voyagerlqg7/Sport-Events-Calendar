import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { PlayerRepository } from '../../infrastructure/player.repository';
import { TeamRepository } from '../../../team/infrastructure/team.repository';
import { Player } from '../../domain/player.entity';
import { PlayerViewDto } from '../../api/view-dto/player.view-dto';
import { CreatePlayerDomainDto } from '../../domain/domainDto/playerDomainDto';
import { DomainException } from '../../../../core/exceptions/domain.exceptions';

export class CreatePlayerCommand {
  constructor(public dto: CreatePlayerDomainDto) {}
}

@CommandHandler(CreatePlayerCommand)
export class CreatePlayerUseCase implements ICommandHandler<
  CreatePlayerCommand,
  PlayerViewDto
> {
  constructor(
    private readonly playerRepository: PlayerRepository,
    private readonly teamRepository: TeamRepository,
  ) {}

  async execute({ dto }: CreatePlayerCommand): Promise<PlayerViewDto> {
    if (dto.teamId) {
      const team = await this.teamRepository.findById(dto.teamId);
      if (!team) {
        throw DomainException.notFound('Team', 'Create player failed');
      }
    }

    const player = Player.createInstance({
      name: dto.name,
      position: dto.position,
      number: dto.number,
      teamId: dto.teamId,
    });

    const savedPlayer = await this.playerRepository.save(player);

    return PlayerViewDto.mapToView(savedPlayer);
  }
}
