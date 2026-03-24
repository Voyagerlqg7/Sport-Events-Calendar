import { Competition } from '../../domain/competition.entity';
import { StageViewDto } from '../../../stage/api/view-dto/stage.view-dto';

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

export class CompetitionWithStagesViewDto extends CompetitionViewDto {
  stages: StageViewDto[];

  static mapToView(competition: Competition): CompetitionWithStagesViewDto {
    const dto = new CompetitionWithStagesViewDto();
    Object.assign(dto, CompetitionViewDto.mapToView(competition));
    dto.stages =
      competition.stages?.map((stage) => StageViewDto.mapToView(stage)) || [];
    return dto;
  }
}

export class CompetitionWithMatchesViewDto extends CompetitionWithStagesViewDto {
  static mapToView(competition: Competition): CompetitionWithMatchesViewDto {
    const dto = new CompetitionWithMatchesViewDto();
    Object.assign(dto, CompetitionWithStagesViewDto.mapToView(competition));
    return dto;
  }
}

export class CompetitionWithDetailsViewDto extends CompetitionWithMatchesViewDto {
  static mapToView(competition: Competition): CompetitionWithDetailsViewDto {
    const dto = new CompetitionWithDetailsViewDto();
    Object.assign(dto, CompetitionWithMatchesViewDto.mapToView(competition));
    return dto;
  }
}
