import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { TeamRepository } from '../../infrastructure/team.repository';
import { DomainException } from '../../../../core/exceptions/domain.exceptions';

export class DeleteTeamCommand {
  constructor(public teamId: string) {}
}

@CommandHandler(DeleteTeamCommand)
export class DeleteTeamUseCase implements ICommandHandler<
  DeleteTeamCommand,
  void
> {
  constructor(private readonly teamRepository: TeamRepository) {}

  async execute({ teamId }: DeleteTeamCommand): Promise<void> {
    const team = await this.teamRepository.findById(teamId);

    if (!team) {
      throw DomainException.notFound('Team', 'Delete team failed');
    }

    await this.teamRepository.delete(teamId);
  }
}
