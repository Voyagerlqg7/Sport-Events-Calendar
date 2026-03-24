import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { CompetitionRepository } from '../../infrastructure/competition.repository';
import { CompetitionWithMatchesViewDto } from '../../api/view-dto/competition.view-dto';
import { DomainException } from '../../../../core/exceptions/domain.exceptions';

export class GetCompetitionWithFullHierarchyQuery {
  constructor(public readonly id: string) {}
}

@QueryHandler(GetCompetitionWithFullHierarchyQuery)
export class GetCompetitionWithFullHierarchyUseCase implements IQueryHandler<
  GetCompetitionWithFullHierarchyQuery,
  CompetitionWithMatchesViewDto
> {
  constructor(private readonly competitionRepository: CompetitionRepository) {}

  async execute(
    query: GetCompetitionWithFullHierarchyQuery,
  ): Promise<CompetitionWithMatchesViewDto> {
    const competition =
      await this.competitionRepository.findByIdWithFullHierarchy(query.id);

    if (!competition) {
      throw DomainException.notFound(
        'Competition',
        `Competition with id ${query.id} not found`,
      );
    }

    return CompetitionWithMatchesViewDto.mapToView(competition);
  }
}
