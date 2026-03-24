import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { TeamRepository } from '../../infrastructure/team.repository';
import { Team } from '../../domain/team.entity';
import { TeamViewDto } from '../../api/view-dto/team.view-dto';
import { CreateTeamsDto } from '../../dto/teamDto';

export class CreateTeamCommand {
  constructor(public dto: CreateTeamsDto) {}
}

@CommandHandler(CreateTeamCommand)
export class CreateTeamUseCase implements ICommandHandler<
  CreateTeamCommand,
  TeamViewDto[]
> {
  constructor(private readonly teamRepository: TeamRepository) {}

  async execute(command: CreateTeamCommand): Promise<TeamViewDto[]> {
    const teams = command.dto.teams.map((teamDto) =>
      Team.createInstance({
        name: teamDto.name,
        officialName: teamDto.officialName,
        slug: teamDto.slug,
        abbreviation: teamDto.abbreviation,
        teamCountryCode: teamDto.teamCountryCode,
        stagePosition: teamDto.stagePosition,
      }),
    );

    const savedTeams = await this.teamRepository.saveMany(teams);

    return savedTeams.map((team) => TeamViewDto.mapToView(team));
  }
}
