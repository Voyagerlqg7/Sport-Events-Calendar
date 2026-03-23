import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { TeamRepository } from '../../infrastructure/team.repository';
import { Team } from '../../domain/team.entity';
import { TeamViewDto } from '../../api/view-dto/team.view-dto';
import { CreateTeamDomainDto } from '../../domain/domainDto/teamDomainDto';

export class CreateTeamCommand {
  constructor(public dto: CreateTeamDomainDto) {}
}

@CommandHandler(CreateTeamCommand)
export class CreateTeamUseCase implements ICommandHandler<
  CreateTeamCommand,
  TeamViewDto
> {
  constructor(private readonly teamRepository: TeamRepository) {}

  async execute({ dto }: CreateTeamCommand): Promise<TeamViewDto> {
    const team = Team.createInstance({
      name: dto.name,
      officialName: dto.officialName,
      slug: dto.slug,
      abbreviation: dto.abbreviation,
      teamCountryCode: dto.teamCountryCode,
      stagePosition: dto.stagePosition,
    });

    const savedTeam = await this.teamRepository.save(team);

    return TeamViewDto.mapToView(savedTeam);
  }
}
