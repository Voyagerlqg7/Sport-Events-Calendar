import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { StageRepository } from '../../infrastructure/stage.repository';
import { CompetitionRepository } from '../../../competition/infrastructure/competition.repository';
import { StageViewDto } from '../../api/view-dto/stage.view-dto';
import { UpdateStageDomainDto } from '../../domain/domainDto/stageDomainDto';
import { DomainException } from '../../../../core/exceptions/domain.exceptions';

export class UpdateStageCommand {
  constructor(
    public stageId: string,
    public dto: UpdateStageDomainDto,
  ) {}
}

@CommandHandler(UpdateStageCommand)
export class UpdateStageUseCase implements ICommandHandler<
  UpdateStageCommand,
  StageViewDto
> {
  constructor(
    private readonly stageRepository: StageRepository,
    private readonly competitionRepository: CompetitionRepository,
  ) {}

  async execute({ stageId, dto }: UpdateStageCommand): Promise<StageViewDto> {
    const stage = await this.stageRepository.findById(stageId);

    if (!stage) {
      throw DomainException.notFound('Stage', 'Update stage failed');
    }

    if (dto.competitionId) {
      const competition = await this.competitionRepository.findById(
        dto.competitionId,
      );
      if (!competition) {
        throw DomainException.notFound('Competition', 'Update stage failed');
      }
    }

    stage.update(dto);
    const savedStage = await this.stageRepository.save(stage);

    return StageViewDto.mapToView(savedStage);
  }
}
