import { Competition } from '../../domain/competition.entity';

export class CompetitionViewDto {
  id: string;
  originCompetitionId: string;
  originCompetitionName: string;
  createdAt: Date;
  updatedAt: Date;

  static mapToView(competition: Competition): CompetitionViewDto {
    const dto = new CompetitionViewDto();
    dto.id = competition.id;
    dto.originCompetitionId = competition.originCompetitionId;
    dto.originCompetitionName = competition.originCompetitionName;
    dto.createdAt = competition.createdAt;
    dto.updatedAt = competition.updatedAt;
    return dto;
  }
}
