import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { MatchRepository } from '../../infrastructure/match.repository';
import { DomainException } from '../../../../core/exceptions/domain.exceptions';

export class DeleteMatchCommand {
  constructor(public matchId: string) {}
}

@CommandHandler(DeleteMatchCommand)
export class DeleteMatchUseCase implements ICommandHandler<
  DeleteMatchCommand,
  void
> {
  constructor(private readonly matchRepository: MatchRepository) {}

  async execute({ matchId }: DeleteMatchCommand): Promise<void> {
    const match = await this.matchRepository.findById(matchId);

    if (!match) {
      throw DomainException.notFound('Match', 'Delete match failed');
    }

    await this.matchRepository.delete(matchId);
  }
}
