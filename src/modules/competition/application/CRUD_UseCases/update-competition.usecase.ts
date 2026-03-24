import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CompetitionRepository } from '../../infrastructure/competition.repository';
import { CompetitionViewDto } from '../../api/view-dto/competition.view-dto';
import { UpdateCompetitionDomainDto } from '../../domain/domainDto/competitionDomainDto';
import { DomainException } from '../../../../core/exceptions/domain.exceptions';

export class UpdateCompetitionCommand {
  constructor(public dto: UpdateCompetitionDomainDto) {}
}

@CommandHandler(UpdateCompetitionCommand)
export class UpdateCompetitionUseCase implements ICommandHandler<
  UpdateCompetitionCommand,
  CompetitionViewDto
> {
  constructor(private readonly competitionRepository: CompetitionRepository) {}

  async execute({
    dto,
  }: UpdateCompetitionCommand): Promise<CompetitionViewDto> {
    const competition = await this.competitionRepository.findByOriginId(
      dto.originCompetitionId,
    );
    if (!competition) {
      throw DomainException.notFound(
        'Competition',
        'Update competition failed',
      );
    }
    competition.update(dto);
    const savedCompetition = await this.competitionRepository.save(competition);
    return CompetitionViewDto.mapToView(savedCompetition);
  }
}
