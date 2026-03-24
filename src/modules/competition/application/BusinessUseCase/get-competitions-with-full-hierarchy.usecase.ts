import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { CompetitionRepository } from '../../infrastructure/competition.repository';
import { CompetitionWithMatchesViewDto } from '../../api/view-dto/competition.view-dto';

export class GetCompetitionsWithFullHierarchyQuery {}

@QueryHandler(GetCompetitionsWithFullHierarchyQuery)
export class GetCompetitionsWithFullHierarchyUseCase implements IQueryHandler<
  GetCompetitionsWithFullHierarchyQuery,
  CompetitionWithMatchesViewDto[]
> {
  constructor(private readonly competitionRepository: CompetitionRepository) {}

  async execute(): Promise<CompetitionWithMatchesViewDto[]> {
    const competitions =
      await this.competitionRepository.findAllWithFullHierarchy();
    return competitions.map((competition) =>
      CompetitionWithMatchesViewDto.mapToView(competition),
    );
  }
}
