// team/application/use-cases/update-team.usecase.ts
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { TeamRepository } from '../../infrastructure/team.repository';
import { TeamViewDto } from '../../api/view-dto/team.view-dto';
import { UpdateTeamDomainDto } from '../../domain/domainDto/teamDomainDto';
import { DomainException } from '../../../../core/exceptions/domain.exceptions';

export class UpdateTeamCommand {
  constructor(
    public teamId: string,
    public dto: UpdateTeamDomainDto,
  ) {}
}

@CommandHandler(UpdateTeamCommand)
export class UpdateTeamUseCase implements ICommandHandler<
  UpdateTeamCommand,
  TeamViewDto
> {
  constructor(private readonly teamRepository: TeamRepository) {}

  async execute({ teamId, dto }: UpdateTeamCommand): Promise<TeamViewDto> {
    const team = await this.teamRepository.findById(teamId);

    if (!team) {
      throw DomainException.notFound('Team', 'Update team failed');
    }

    team.update(dto);
    const savedTeam = await this.teamRepository.save(team);

    return TeamViewDto.mapToView(savedTeam);
  }
}
