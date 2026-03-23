import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { TeamRepository } from '../../infrastructure/team.repository';
import { TeamViewDto } from '../../api/view-dto/team.view-dto';
import { DomainException } from '../../../../core/exceptions/domain.exceptions';

export class GetTeamCommand {
  constructor(public teamId: string) {}
}

@CommandHandler(GetTeamCommand)
export class GetTeamUseCase implements ICommandHandler<
  GetTeamCommand,
  TeamViewDto
> {
  constructor(private readonly teamRepository: TeamRepository) {}

  async execute(command: GetTeamCommand): Promise<TeamViewDto> {
    const team = await this.teamRepository.findByIdWithDetails(command.teamId);

    if (!team) {
      throw DomainException.notFound('Team', 'Find a team by Id');
    }

    return TeamViewDto.mapToView(team);
  }
}
