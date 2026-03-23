import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { MatchRepository } from '../../infrastructure/match.repository';
import { Match } from '../../domain/match.entity';
import { MatchViewDto } from '../../api/view-dto/match.view-dto';
import { CreateMatchDomainDto } from '../../domain/domainDto/matchDomainDto';
import { DomainException } from '../../../../core/exceptions/domain.exceptions';
import { StageRepository } from '../../../stage/infrastructure/stage.repository';
import { TeamRepository } from '../../../team/infrastructure/team.repository';

export class CreateMatchCommand {
  constructor(public dto: CreateMatchDomainDto) {}
}

@CommandHandler(CreateMatchCommand)
export class CreateMatchUseCase implements ICommandHandler<
  CreateMatchCommand,
  MatchViewDto
> {
  constructor(
    private readonly matchRepository: MatchRepository,
    private readonly stageRepository: StageRepository,
    private readonly teamRepository: TeamRepository,
  ) {}

  async execute({ dto }: CreateMatchCommand): Promise<MatchViewDto> {
    const stage = await this.stageRepository.findById(dto.stageId);
    if (!stage) {
      throw DomainException.notFound('Stage', 'Create match failed');
    }

    const homeTeam = await this.teamRepository.findById(dto.homeTeamId);
    const awayTeam = await this.teamRepository.findById(dto.awayTeamId);

    if (!homeTeam) {
      throw DomainException.notFound('Home team', 'Create match failed');
    }
    if (!awayTeam) {
      throw DomainException.notFound('Away team', 'Create match failed');
    }

    const match = Match.createInstance({
      season: dto.season,
      status: dto.status,
      timeVenueUTC: dto.timeVenueUTC,
      dateVenue: dto.dateVenue,
      group: dto.group,
      stadium: dto.stadium,
      homeTeamId: dto.homeTeamId,
      awayTeamId: dto.awayTeamId,
      stageId: dto.stageId,
    });

    const savedMatch = await this.matchRepository.save(match);

    return MatchViewDto.mapToView(savedMatch);
  }
}
