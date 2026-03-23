import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { MatchRepository } from '../../infrastructure/match.repository';
import { MatchViewDto } from '../../api/view-dto/match.view-dto';
import { DomainException } from '../../../../core/exceptions/domain.exceptions';

export class GetMatchCommand {
  constructor(public matchId: string) {}
}

@CommandHandler(GetMatchCommand)
export class GetMatchUseCase implements ICommandHandler<
  GetMatchCommand,
  MatchViewDto
> {
  constructor(private readonly matchRepository: MatchRepository) {}

  async execute(command: GetMatchCommand): Promise<MatchViewDto> {
    const match = await this.matchRepository.findByIdWithDetails(
      command.matchId,
    );

    if (!match) {
      throw DomainException.notFound('Match', 'Find a match by Id');
    }

    return MatchViewDto.mapToView(match);
  }
}
