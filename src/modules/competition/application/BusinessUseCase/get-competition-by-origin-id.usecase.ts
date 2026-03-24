import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { CompetitionRepository } from '../../infrastructure/competition.repository';
import { CompetitionWithStagesViewDto } from '../../api/view-dto/competition.view-dto';
import { DomainException } from '../../../../core/exceptions/domain.exceptions';

export class GetCompetitionByOriginIdQuery {
  constructor(public readonly originId: string) {}
}

@QueryHandler(GetCompetitionByOriginIdQuery)
export class GetCompetitionByOriginIdUseCase implements IQueryHandler<
  GetCompetitionByOriginIdQuery,
  CompetitionWithStagesViewDto
> {
  constructor(private readonly competitionRepository: CompetitionRepository) {}

  async execute(
    query: GetCompetitionByOriginIdQuery,
  ): Promise<CompetitionWithStagesViewDto> {
    const competition =
      await this.competitionRepository.findByOriginIdWithStages(query.originId);

    if (!competition) {
      throw DomainException.notFound(
        'Competition',
        `Competition with origin id ${query.originId} not found`,
      );
    }

    return CompetitionWithStagesViewDto.mapToView(competition);
  }
}
