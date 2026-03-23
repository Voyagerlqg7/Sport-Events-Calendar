import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { StageRepository } from '../../infrastructure/stage.repository';
import { StageViewDto } from '../../api/view-dto/stage.view-dto';
import { DomainException } from '../../../../core/exceptions/domain.exceptions';

export class GetStageCommand {
  constructor(public stageId: string) {}
}

@CommandHandler(GetStageCommand)
export class GetStageUseCase implements ICommandHandler<
  GetStageCommand,
  StageViewDto
> {
  constructor(private readonly stageRepository: StageRepository) {}

  async execute(command: GetStageCommand): Promise<StageViewDto> {
    const stage = await this.stageRepository.findByIdWithMatches(
      command.stageId,
    );

    if (!stage) {
      throw DomainException.notFound('Stage', 'Find a stage by Id');
    }

    return StageViewDto.mapToView(stage);
  }
}
