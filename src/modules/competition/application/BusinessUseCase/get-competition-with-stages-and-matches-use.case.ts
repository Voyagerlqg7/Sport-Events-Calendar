import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { CompetitionRepository } from '../../infrastructure/competition.repository';
import { CompetitionWithMatchesViewDto } from '../../api/view-dto/competition.view-dto';
import { DomainException } from '../../../../core/exceptions/domain.exceptions';

export class GetCompetitionWithStagesAndMatchesQuery {
  constructor(public readonly id: string) {}
}

@QueryHandler(GetCompetitionWithStagesAndMatchesQuery)
export class GetCompetitionWithStagesAndMatchesUseCase implements IQueryHandler<
  GetCompetitionWithStagesAndMatchesQuery,
  CompetitionWithMatchesViewDto
> {
  constructor(private readonly competitionRepository: CompetitionRepository) {}

  async execute(
    query: GetCompetitionWithStagesAndMatchesQuery,
  ): Promise<CompetitionWithMatchesViewDto> {
    const competition =
      await this.competitionRepository.findByIdWithStagesAndMatches(query.id);

    if (!competition) {
      throw DomainException.notFound(
        'Competition',
        `Competition with id ${query.id} not found`,
      );
    }

    return CompetitionWithMatchesViewDto.mapToView(competition);
  }
}
