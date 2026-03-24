import { ICommandHandler, CommandHandler } from '@nestjs/cqrs';
import { CreateMatchesDto } from '../../../match/dto/matchDto';
import { MatchViewDto } from '../../../match/api/view-dto/match.view-dto';
import { MatchRepository } from '../../../match/infrastructure/match.repository';
import { StageRepository } from '../../../stage/infrastructure/stage.repository';
import { DomainException } from '../../../../core/exceptions/domain.exceptions';
import { Match } from '../../../match/domain/match.entity';

export class CreateMatchesForStagesCommand {
  constructor(
    public readonly competitionId: string,
    public readonly dto: CreateMatchesDto,
  ) {}
}

@CommandHandler(CreateMatchesForStagesCommand)
export class CreateMatchesForStagesUseCase implements ICommandHandler<
  CreateMatchesForStagesCommand,
  MatchViewDto[]
> {
  constructor(
    private readonly stageRepository: StageRepository,
    private readonly matchRepository: MatchRepository,
  ) {}

  async execute(
    command: CreateMatchesForStagesCommand,
  ): Promise<MatchViewDto[]> {
    const stageIds = [...new Set(command.dto.matches.map((m) => m.stageId))];

    if (stageIds.length !== 1) {
      throw DomainException.badRequest(
        `All matches must belong to the same stage. Found ${stageIds.length} different stages: ${stageIds.join(', ')}`,
      );
    }

    const stageId = stageIds[0];

    //Is Stage belongs to competition?
    const stage = await this.stageRepository.findByIdAndCompetitionId(
      stageId,
      command.competitionId,
    );

    if (!stage) {
      throw DomainException.notFound(
        'Stage',
        `Stage with id ${stageId} not found or does not belong to competition ${command.competitionId}`,
      );
    }

    const matches = command.dto.matches.map((matchDto) =>
      Match.createInstance({
        ...matchDto,
      }),
    );

    const savedMatches = await this.matchRepository.saveMany(matches);
    return savedMatches.map((match) => MatchViewDto.mapToView(match));
  }
}
