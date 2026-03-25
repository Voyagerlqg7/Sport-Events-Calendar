import { ICommandHandler, CommandHandler } from '@nestjs/cqrs';
import { CreateStagesDto } from '../../../stage/dto/stageDto';
import { StageViewDto } from '../../../stage/api/view-dto/stage.view-dto';
import { CompetitionRepository } from '../../infrastructure/competition.repository';
import { StageRepository } from '../../../stage/infrastructure/stage.repository';
import { DomainException } from '../../../../core/exceptions/domain.exceptions';
import { Stage } from '../../../stage/domain/stage.entity';

export class CreateStagesForCompetitionCommand {
  constructor(public dto: CreateStagesDto) {}
}

@CommandHandler(CreateStagesForCompetitionCommand)
export class CreateStagesForCompetitionUseCase implements ICommandHandler<
  CreateStagesForCompetitionCommand,
  StageViewDto[]
> {
  constructor(
    private readonly competitionRepository: CompetitionRepository,
    private readonly stageRepository: StageRepository,
  ) {}

  async execute(
    command: CreateStagesForCompetitionCommand,
  ): Promise<StageViewDto[]> {
    const competitionIds = [
      ...new Set(command.dto.stages.map((s) => s.competitionId)),
    ];

    if (competitionIds.length !== 1) {
      throw DomainException.badRequest(
        'All stages must belong to the same competition',
      );
    }

    const competitionId = competitionIds[0];

    const competition =
      await this.competitionRepository.findById(competitionId);
    if (!competition) {
      throw DomainException.notFound(
        'Competition',
        `Competition with id ${competitionId} not found`,
      );
    }
    const existingStages =
      await this.stageRepository.findByCompetitionId(competitionId);
    if (existingStages.length > 0) {
      const existingCodes = new Set(existingStages.map((s) => s.code));
      const duplicates = command.dto.stages.filter((s) =>
        existingCodes.has(s.code),
      );

      if (duplicates.length > 0) {
        throw DomainException.badRequest(
          `Stages with codes already exist: ${duplicates.map((s) => s.code).join(', ')}`,
        );
      }
    }

    const stages = command.dto.stages.map((stageDto) =>
      Stage.createInstance(stageDto),
    );

    const savedStages = await this.stageRepository.saveMany(stages);
    return savedStages.map((stage) => StageViewDto.mapToView(stage));
  }
}
