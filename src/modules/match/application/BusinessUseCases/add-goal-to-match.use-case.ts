import { ICommandHandler, CommandHandler } from '@nestjs/cqrs';
import { MatchRepository } from '../../infrastructure/match.repository';
import { ResultRepository } from '../../../result/infrastructure/results.repository';
import { GoalRepository } from '../../../goal/infrastructure/goal.repository';
import { PlayerRepository } from '../../../player/infrastructure/player.repository';
import { TeamRepository } from '../../../team/infrastructure/team.repository';
import { DomainException } from '../../../../core/exceptions/domain.exceptions';
import { Goal } from '../../../goal/domain/goal.entity';
import { MatchViewDto } from '../../api/view-dto/match.view-dto';
import { AddGoalDto } from '../../dto/match-details.dto';

export class AddGoalToMatchCommand {
  constructor(
    public readonly matchId: string,
    public readonly dto: AddGoalDto,
  ) {}
}

@CommandHandler(AddGoalToMatchCommand)
export class AddGoalToMatchUseCase implements ICommandHandler<
  AddGoalToMatchCommand,
  MatchViewDto
> {
  constructor(
    private readonly matchRepository: MatchRepository,
    private readonly resultRepository: ResultRepository,
    private readonly goalRepository: GoalRepository,
    private readonly playerRepository: PlayerRepository,
    private readonly teamRepository: TeamRepository,
  ) {}

  async execute(command: AddGoalToMatchCommand): Promise<MatchViewDto> {
    const match = await this.matchRepository.findByIdWithResult(
      command.matchId,
    );

    if (!match) {
      throw DomainException.notFound(
        'Match',
        `Match with id ${command.matchId} not found`,
      );
    }

    if (match.status === 'finished') {
      throw DomainException.badRequest('Cannot add goal to finished match');
    }

    const player = await this.playerRepository.findById(command.dto.playerId);
    if (!player) {
      throw DomainException.notFound(
        'Player',
        `Player with id ${command.dto.playerId} not found`,
      );
    }

    if (
      player.teamId !== match.homeTeamId &&
      player.teamId !== match.awayTeamId
    ) {
      throw DomainException.badRequest(
        'Player does not belong to either team in this match',
      );
    }

    let teamId = command.dto.teamId;
    if (command.dto.type === 'own') {
      if (!teamId) {
        throw DomainException.badRequest('TeamId is required for own goals');
      }
      if (teamId !== match.homeTeamId && teamId !== match.awayTeamId) {
        throw DomainException.badRequest('Team does not belong to this match');
      }
    } else {
      teamId = player.teamId;
    }

    let result = match.result;
    if (!result) {
      result = await this.resultRepository.createEmpty(match.id);
    }

    const goal = Goal.createInstance({
      playerName: command.dto.playerName,
      minute: command.dto.minute,
      type: command.dto.type || 'regular',
      resultId: result.id,
      playerId: command.dto.playerId,
      teamId: teamId,
    });

    if (teamId === match.homeTeamId) {
      result.homeGoals += 1;
    } else {
      result.awayGoals += 1;
    }

    await this.resultRepository.save(result);
    await this.goalRepository.save(goal);

    const updatedMatch = await this.matchRepository.findByIdWithResult(
      command.matchId,
    );
    return MatchViewDto.mapToView(updatedMatch!);
  }
}
