import { Team } from '../../domain/team.entity';

export class TeamViewDto {
  id: string;
  name: string;
  officialName: string | null;
  slug: string;
  abbreviation: string;
  teamCountryCode: string;
  stagePosition: number | null;
  createdAt: Date;
  updatedAt: Date;

  static mapToView(team: Team): TeamViewDto {
    const dto = new TeamViewDto();
    dto.id = team.id;
    dto.name = team.name;
    dto.officialName = team.officialName;
    dto.slug = team.slug;
    dto.abbreviation = team.abbreviation;
    dto.teamCountryCode = team.teamCountryCode;
    dto.stagePosition = team.stagePosition;
    dto.createdAt = team.createdAt;
    dto.updatedAt = team.updatedAt;
    return dto;
  }
}
