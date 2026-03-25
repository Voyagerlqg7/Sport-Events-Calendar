import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CompetitionRepository } from '../../infrastructure/competition.repository';
import { CompetitionViewDto } from '../../api/view-dto/competition.view-dto';
import { UpdateCompetitionDomainDto } from '../../domain/domainDto/competitionDomainDto';
import { DomainException } from '../../../../core/exceptions/domain.exceptions';

export class UpdateCompetitionCommand {
  constructor(
    public readonly id: string,
    public readonly dto: UpdateCompetitionDomainDto,
  ) {}
}

@CommandHandler(UpdateCompetitionCommand)
export class UpdateCompetitionUseCase implements ICommandHandler<
  UpdateCompetitionCommand,
  CompetitionViewDto
> {
  constructor(private readonly competitionRepository: CompetitionRepository) {}

  async execute(
    command: UpdateCompetitionCommand,
  ): Promise<CompetitionViewDto> {
    const competition = await this.competitionRepository.findById(command.id);
    if (!competition) {
      throw DomainException.notFound(
        'Competition',
        'Update competition failed',
      );
    }
    competition.update(command.dto);
    const savedCompetition = await this.competitionRepository.save(competition);
    return CompetitionViewDto.mapToView(savedCompetition);
  }
}
