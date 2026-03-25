import { Stage } from '../../domain/stage.entity';
import { MatchViewDto } from '../../../match/api/view-dto/match.view-dto';

export class StageViewDto {
  id: string;
  code: string;
  name: string;
  ordering: number;
  competitionId: string;
  matches: MatchViewDto[];
  createdAt: Date;
  updatedAt: Date;

  static mapToView(this: void, stage: Stage): StageViewDto {
    const dto = new StageViewDto();
    dto.id = stage.id;
    dto.code = stage.code;
    dto.name = stage.name;
    dto.ordering = stage.ordering;
    dto.competitionId = stage.competitionId;
    dto.matches = stage.matches?.map(MatchViewDto.mapToView) || [];
    dto.createdAt = stage.createdAt;
    dto.updatedAt = stage.updatedAt;
    return dto;
  }
}
