import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { MatchRepository } from '../../infrastructure/match.repository';
import { MatchViewDto } from '../../api/view-dto/match.view-dto';
import { UpdateMatchDomainDto } from '../../domain/domainDto/matchDomainDto';
import { DomainException } from '../../../../core/exceptions/domain.exceptions';
import { StageRepository } from '../../../stage/infrastructure/stage.repository';
import { TeamRepository } from '../../../team/infrastructure/team.repository';

export class UpdateMatchCommand {
  constructor(
    public matchId: string,
    public dto: UpdateMatchDomainDto,
  ) {}
}

@CommandHandler(UpdateMatchCommand)
export class UpdateMatchUseCase implements ICommandHandler<
  UpdateMatchCommand,
  MatchViewDto
> {
  constructor(
    private readonly matchRepository: MatchRepository,
    private readonly stageRepository: StageRepository,
    private readonly teamRepository: TeamRepository,
  ) {}

  async execute({ matchId, dto }: UpdateMatchCommand): Promise<MatchViewDto> {
    const match = await this.matchRepository.findById(matchId);

    if (!match) {
      throw DomainException.notFound('Match', 'Update match failed');
    }

    if (dto.stageId) {
      const stage = await this.stageRepository.findById(dto.stageId);
      if (!stage) {
        throw DomainException.notFound('Stage', 'Update match failed');
      }
    }

    if (dto.homeTeamId) {
      const homeTeam = await this.teamRepository.findById(dto.homeTeamId);
      if (!homeTeam) {
        throw DomainException.notFound('Home team', 'Update match failed');
      }
    }

    if (dto.awayTeamId) {
      const awayTeam = await this.teamRepository.findById(dto.awayTeamId);
      if (!awayTeam) {
        throw DomainException.notFound('Away team', 'Update match failed');
      }
    }

    match.update(dto);
    const savedMatch = await this.matchRepository.save(match);

    return MatchViewDto.mapToView(savedMatch);
  }
}
