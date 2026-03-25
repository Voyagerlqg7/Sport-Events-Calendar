import { Competition } from '../../domain/competition.entity';
import { StageViewDto } from '../../../stage/api/view-dto/stage.view-dto';
import { MatchViewDto } from '../../../match/api/view-dto/match.view-dto';

// Base DTO – contains stages
export class CompetitionViewDto {
  id: string;
  originCompetitionId: string;
  originCompetitionName: string;
  stages: StageViewDto[];
  createdAt: Date;
  updatedAt: Date;

  static mapToView(this: void, competition: Competition): CompetitionViewDto {
    const dto = new CompetitionViewDto();
    dto.id = competition.id;
    dto.originCompetitionId = competition.originCompetitionId;
    dto.originCompetitionName = competition.originCompetitionName;
    dto.stages = competition.stages?.map(StageViewDto.mapToView) || [];
    dto.createdAt = competition.createdAt;
    dto.updatedAt = competition.updatedAt;
    return dto;
  }
}

export class CompetitionWithStagesViewDto extends CompetitionViewDto {
  static mapToView(
    this: void,
    competition: Competition,
  ): CompetitionWithStagesViewDto {
    const dto = new CompetitionWithStagesViewDto();
    Object.assign(dto, CompetitionViewDto.mapToView(competition));
    return dto;
  }
}

// Removing the duplicate “stages” field
export class CompetitionWithMatchesViewDto extends CompetitionWithStagesViewDto {
  static mapToView(
    this: void,
    competition: Competition,
  ): CompetitionWithMatchesViewDto {
    const dto = new CompetitionWithMatchesViewDto();
    Object.assign(dto, CompetitionWithStagesViewDto.mapToView(competition));
    return dto;
  }
}

export class CompetitionDetailsViewDto {
  competition: CompetitionViewDto;
  stages?: StageViewDto[];
  matches?: MatchViewDto[];

  static mapToView(
    this: void,
    competition: Competition,
    includeMatches: boolean = false,
  ): CompetitionDetailsViewDto {
    const dto = new CompetitionDetailsViewDto();
    dto.competition = CompetitionViewDto.mapToView(competition);

    if (competition.stages) {
      dto.stages = competition.stages.map(StageViewDto.mapToView);

      if (includeMatches && competition.stages) {
        dto.matches = competition.stages.flatMap(
          (stage) => stage.matches?.map(MatchViewDto.mapToView) ?? [],
        );
      }
    }
    return dto;
  }
}
