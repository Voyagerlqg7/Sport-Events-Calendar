import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { StageRepository } from '../../infrastructure/stage.repository';
import { DomainException } from '../../../../core/exceptions/domain.exceptions';

export class DeleteStageCommand {
  constructor(public stageId: string) {}
}

@CommandHandler(DeleteStageCommand)
export class DeleteStageUseCase implements ICommandHandler<
  DeleteStageCommand,
  void
> {
  constructor(private readonly stageRepository: StageRepository) {}

  async execute({ stageId }: DeleteStageCommand): Promise<void> {
    const stage = await this.stageRepository.findById(stageId);

    if (!stage) {
      throw DomainException.notFound('Stage', 'Delete stage failed');
    }

    await this.stageRepository.delete(stageId);
  }
}
