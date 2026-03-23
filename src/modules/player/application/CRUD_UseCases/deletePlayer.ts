import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { PlayerRepository } from '../../infrastructure/player.repository';
import { DomainException } from '../../../../core/exceptions/domain.exceptions';

export class DeletePlayerCommand {
  constructor(public playerId: string) {}
}

@CommandHandler(DeletePlayerCommand)
export class DeletePlayerUseCase implements ICommandHandler<
  DeletePlayerCommand,
  void
> {
  constructor(private readonly playerRepository: PlayerRepository) {}

  async execute({ playerId }: DeletePlayerCommand): Promise<void> {
    const player = await this.playerRepository.findById(playerId);

    if (!player) {
      throw DomainException.notFound('Player', 'Delete player failed');
    }

    await this.playerRepository.delete(playerId);
  }
}
