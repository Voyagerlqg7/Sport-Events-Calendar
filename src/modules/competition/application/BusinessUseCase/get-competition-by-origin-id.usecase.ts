import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { CompetitionRepository } from '../../infrastructure/competition.repository';
import { CompetitionWithStagesViewDto } from '../../api/view-dto/competition.view-dto';
import { DomainException } from '../../../../core/exceptions/domain.exceptions';

export class GetCompetitionByOriginIdCommand {
  constructor(public readonly originId: string) {}
}

@QueryHandler(GetCompetitionByOriginIdCommand)
export class GetCompetitionByOriginIdUseCase implements IQueryHandler<
  GetCompetitionByOriginIdCommand,
  CompetitionWithStagesViewDto
> {
  constructor(private readonly competitionRepository: CompetitionRepository) {}

  async execute(
    query: GetCompetitionByOriginIdCommand,
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
