import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { CompetitionRepository } from '../../infrastructure/competition.repository';
import { CompetitionWithDetailsViewDto } from '../../api/view-dto/competition.view-dto';
import { DomainException } from '../../../../core/exceptions/domain.exceptions';

export class GetCompetitionWithMatchesAndTeamsQuery {
  constructor(public readonly id: string) {}
}

@QueryHandler(GetCompetitionWithMatchesAndTeamsQuery)
export class GetCompetitionWithMatchesAndTeamsUseCase implements IQueryHandler<
  GetCompetitionWithMatchesAndTeamsQuery,
  CompetitionWithDetailsViewDto
> {
  constructor(private readonly competitionRepository: CompetitionRepository) {}

  async execute(
    query: GetCompetitionWithMatchesAndTeamsQuery,
  ): Promise<CompetitionWithDetailsViewDto> {
    const competition =
      await this.competitionRepository.findByIdWithMatchesAndTeams(query.id);

    if (!competition) {
      throw DomainException.notFound(
        'Competition',
        `Competition with id ${query.id} not found`,
      );
    }

    return CompetitionWithDetailsViewDto.mapToView(competition);
  }
}
