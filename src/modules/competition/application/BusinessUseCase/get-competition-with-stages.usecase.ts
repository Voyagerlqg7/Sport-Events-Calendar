import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { CompetitionRepository } from '../../infrastructure/competition.repository';
import { CompetitionWithStagesViewDto } from '../../api/view-dto/competition.view-dto';

export class GetCompetitionsWithStagesQuery {}

@QueryHandler(GetCompetitionsWithStagesQuery)
export class GetCompetitionsWithStagesUseCase implements IQueryHandler<
  GetCompetitionsWithStagesQuery,
  CompetitionWithStagesViewDto[]
> {
  constructor(private readonly competitionRepository: CompetitionRepository) {}

  async execute(): Promise<CompetitionWithStagesViewDto[]> {
    const competitions = await this.competitionRepository.findAllWithStages();
    return competitions.map((competition) =>
      CompetitionWithStagesViewDto.mapToView(competition),
    );
  }
}
