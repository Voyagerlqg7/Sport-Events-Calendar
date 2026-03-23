import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { StageRepository } from '../../infrastructure/stage.repository';
import { CompetitionRepository } from '../../../competition/infrastructure/competition.repository';
import { Stage } from '../../domain/stage.entity';
import { StageViewDto } from '../../api/view-dto/stage.view-dto';
import { CreateStageDomainDto } from '../../domain/domainDto/stageDomainDto';
import { DomainException } from '../../../../core/exceptions/domain.exceptions';

export class CreateStageCommand {
  constructor(public dto: CreateStageDomainDto) {}
}

@CommandHandler(CreateStageCommand)
export class CreateStageUseCase implements ICommandHandler<
  CreateStageCommand,
  StageViewDto
> {
  constructor(
    private readonly stageRepository: StageRepository,
    private readonly competitionRepository: CompetitionRepository,
  ) {}

  async execute({ dto }: CreateStageCommand): Promise<StageViewDto> {
    const competition = await this.competitionRepository.findById(
      dto.competitionId,
    );
    if (!competition) {
      throw DomainException.notFound('Competition', 'Create stage failed');
    }

    const stage = Stage.createInstance({
      code: dto.code,
      name: dto.name,
      ordering: dto.ordering,
      competitionId: dto.competitionId,
    });

    const savedStage = await this.stageRepository.save(stage);

    return StageViewDto.mapToView(savedStage);
  }
}
