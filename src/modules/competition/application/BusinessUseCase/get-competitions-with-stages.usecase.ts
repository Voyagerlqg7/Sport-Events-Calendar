import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { CompetitionRepository } from '../../infrastructure/competition.repository';
import { CompetitionWithStagesViewDto } from '../../api/view-dto/competition.view-dto';
import { DomainException } from '../../../../core/exceptions/domain.exceptions';

export class GetCompetitionWithStagesQueryCommand {
  constructor(public readonly id: string) {}
}

@QueryHandler(GetCompetitionWithStagesQueryCommand)
export class GetCompetitionWithStagesUseCase implements IQueryHandler<
  GetCompetitionWithStagesQueryCommand,
  CompetitionWithStagesViewDto
> {
  constructor(private readonly competitionRepository: CompetitionRepository) {}

  async execute(
    query: GetCompetitionWithStagesQueryCommand,
  ): Promise<CompetitionWithStagesViewDto> {
    const competition = await this.competitionRepository.findByIdWithStages(
      query.id,
    );

    if (!competition) {
      throw DomainException.notFound(
        'Competition',
        `Competition with id ${query.id} not found`,
      );
    }

    return CompetitionWithStagesViewDto.mapToView(competition);
  }
}
