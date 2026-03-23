import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CompetitionRepository } from '../../infrastructure/competition.repository';
import { Competition } from '../../domain/competition.entity';
import { CompetitionViewDto } from '../../api/view-dto/competition.view-dto';
import { CreateCompetitionDomainDto } from '../../domain/domainDto/competitionDomainDto';

export class CreateCompetitionCommand {
  constructor(public dto: CreateCompetitionDomainDto) {}
}

@CommandHandler(CreateCompetitionCommand)
export class CreateCompetitionUseCase implements ICommandHandler<
  CreateCompetitionCommand,
  CompetitionViewDto
> {
  constructor(private readonly competitionRepository: CompetitionRepository) {}

  async execute({
    dto,
  }: CreateCompetitionCommand): Promise<CompetitionViewDto> {
    const competition = Competition.createInstance({
      originCompetitionId: dto.originCompetitionId,
      originCompetitionName: dto.originCompetitionName,
    });

    const savedCompetition = await this.competitionRepository.save(competition);

    return CompetitionViewDto.mapToView(savedCompetition);
  }
}
