import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { CompetitionRepository } from '../../infrastructure/competition.repository';
import { DomainException } from '../../../../core/exceptions/domain.exceptions';
import { CompetitionViewDto } from '../../api/view-dto/competition.view-dto';

export class GetCompetitionFullDetailsQuery {
  constructor(public readonly id: string) {}
}

@QueryHandler(GetCompetitionFullDetailsQuery)
export class GetCompetitionFullDetailsUseCase implements IQueryHandler<
  GetCompetitionFullDetailsQuery,
  CompetitionViewDto
> {
  constructor(private readonly competitionRepository: CompetitionRepository) {}

  async execute(
    query: GetCompetitionFullDetailsQuery,
  ): Promise<CompetitionViewDto> {
    const competition =
      await this.competitionRepository.findByIdWithStages_Matches_Teams_Result(
        query.id,
      );

    if (!competition) {
      throw DomainException.notFound(
        'Competition',
        `Competition with id ${query.id} not found`,
      );
    }

    return CompetitionViewDto.mapToView(competition);
  }
}
