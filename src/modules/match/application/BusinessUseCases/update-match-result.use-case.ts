import { ICommandHandler, CommandHandler } from '@nestjs/cqrs';
import { MatchRepository } from '../../infrastructure/match.repository';
import { ResultRepository } from '../../../result/infrastructure/results.repository';
import { DomainException } from '../../../../core/exceptions/domain.exceptions';
import { MatchViewDto } from '../../api/view-dto/match.view-dto';
import { UpdateResultDto } from '../../dto/match-details.dto';

export class UpdateMatchResultCommand {
  constructor(
    public readonly matchId: string,
    public readonly dto: UpdateResultDto,
  ) {}
}

@CommandHandler(UpdateMatchResultCommand)
export class UpdateMatchResultUseCase implements ICommandHandler<
  UpdateMatchResultCommand,
  MatchViewDto
> {
  constructor(
    private readonly matchRepository: MatchRepository,
    private readonly resultRepository: ResultRepository,
  ) {}

  async execute(command: UpdateMatchResultCommand): Promise<MatchViewDto> {
    const match = await this.matchRepository.findByIdWithResult(
      command.matchId,
    );

    if (!match) {
      throw DomainException.notFound(
        'Match',
        `Match with id ${command.matchId} not found`,
      );
    }

    let result = match.result;
    if (!result) {
      result = await this.resultRepository.createEmpty(match.id);
    }

    if (command.dto.homeGoals !== undefined) {
      result.homeGoals = command.dto.homeGoals;
    }
    if (command.dto.awayGoals !== undefined) {
      result.awayGoals = command.dto.awayGoals;
    }
    if (command.dto.winner !== undefined) {
      result.winner = command.dto.winner;
    }
    if (command.dto.message !== undefined) {
      result.message = command.dto.message;
    }

    await this.resultRepository.save(result);

    const updatedMatch = await this.matchRepository.findByIdWithResult(
      command.matchId,
    );
    return MatchViewDto.mapToView(updatedMatch!);
  }
}
