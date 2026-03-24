import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { CompetitionRepository } from '../../infrastructure/competition.repository';
import { CompetitionViewDto } from '../../api/view-dto/competition.view-dto';

export class GetCompetitionsQuery {}

@QueryHandler(GetCompetitionsQuery)
export class GetCompetitionsUseCase implements IQueryHandler<
  GetCompetitionsQuery,
  CompetitionViewDto[]
> {
  constructor(private readonly competitionRepository: CompetitionRepository) {}

  async execute(): Promise<CompetitionViewDto[]> {
    const competitions = await this.competitionRepository.findAll();
    return competitions.map((competition) =>
      CompetitionViewDto.mapToView(competition),
    );
  }
}
