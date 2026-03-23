import { Stage } from '../../domain/stage.entity';

export class StageViewDto {
  id: string;
  code: string;
  name: string;
  ordering: number;
  competitionId: string;
  createdAt: Date;
  updatedAt: Date;

  static mapToView(stage: Stage): StageViewDto {
    const dto = new StageViewDto();
    dto.id = stage.id;
    dto.code = stage.code;
    dto.name = stage.name;
    dto.ordering = stage.ordering;
    dto.competitionId = stage.competitionId;
    dto.createdAt = stage.createdAt;
    dto.updatedAt = stage.updatedAt;
    return dto;
  }
}
