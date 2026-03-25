import { ICommandHandler, CommandHandler } from '@nestjs/cqrs';
import { MatchRepository } from '../../infrastructure/match.repository';
import { ResultRepository } from '../../../result/infrastructure/results.repository';
import { CardRepository } from '../../../cards/infrastructure/card.repository';
import { PlayerRepository } from '../../../player/infrastructure/player.repository';
import { DomainException } from '../../../../core/exceptions/domain.exceptions';
import { Card } from '../../../cards/domain/cards.entity';
import { MatchViewDto } from '../../api/view-dto/match.view-dto';
import { AddCardDto } from '../../dto/match-details.dto';

export class AddCardToMatchCommand {
  constructor(
    public readonly matchId: string,
    public readonly dto: AddCardDto,
  ) {}
}

@CommandHandler(AddCardToMatchCommand)
export class AddCardToMatchUseCase implements ICommandHandler<
  AddCardToMatchCommand,
  MatchViewDto
> {
  constructor(
    private readonly matchRepository: MatchRepository,
    private readonly resultRepository: ResultRepository,
    private readonly cardRepository: CardRepository,
    private readonly playerRepository: PlayerRepository,
  ) {}

  async execute(command: AddCardToMatchCommand): Promise<MatchViewDto> {
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
      throw DomainException.badRequest('Cannot add card to finished match');
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

    if (command.dto.cardType === 'second_yellow') {
      if (!command.dto.relatedYellowCardId) {
        throw DomainException.badRequest(
          'relatedYellowCardId is required for second yellow card',
        );
      }

      const yellowCard = await this.cardRepository.findById(
        command.dto.relatedYellowCardId,
      );
      if (!yellowCard || yellowCard.cardType !== 'yellow') {
        throw DomainException.badRequest('Invalid related yellow card');
      }
    }

    let result = match.result;
    if (!result) {
      result = await this.resultRepository.createEmpty(match.id);
    }

    const card = Card.createInstance({
      minute: command.dto.minute,
      cardType: command.dto.cardType,
      resultId: result.id,
      playerId: command.dto.playerId,
      relatedYellowCardId: command.dto.relatedYellowCardId,
    });

    await this.resultRepository.save(result);
    await this.cardRepository.save(card);

    const updatedMatch = await this.matchRepository.findByIdWithResult(
      command.matchId,
    );
    return MatchViewDto.mapToView(updatedMatch!);
  }
}
