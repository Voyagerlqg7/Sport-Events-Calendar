import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CompetitionRepository } from '../../infrastructure/competition.repository';
import { CompetitionViewDto } from '../../api/view-dto/competition.view-dto';
import { DomainException } from '../../../../core/exceptions/domain.exceptions';

export class GetCompetitionCommand {
  constructor(public competitionId: string) {}
}

@CommandHandler(GetCompetitionCommand)
export class GetCompetitionUseCase implements ICommandHandler<
  GetCompetitionCommand,
  CompetitionViewDto
> {
  constructor(private readonly competitionRepository: CompetitionRepository) {}

  async execute(command: GetCompetitionCommand): Promise<CompetitionViewDto> {
    const competition = await this.competitionRepository.findById(
      command.competitionId,
    );
    if (!competition) {
      throw DomainException.notFound('Competition', 'Find a competition by Id');
    }
    return CompetitionViewDto.mapToView(competition);
  }
}
