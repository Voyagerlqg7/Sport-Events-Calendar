import { ICommandHandler, CommandHandler } from '@nestjs/cqrs';
import { CompetitionRepository } from '../../infrastructure/competition.repository';
import { DomainException } from '../../../../core/exceptions/domain.exceptions';


export class DeleteCompetitionCommand {
  constructor(public competitionId: string) {}
}
@CommandHandler(DeleteCompetitionCommand)
export class DeleteCompetitionUseCase implements ICommandHandler<
  DeleteCompetitionCommand,
  void
> {
  constructor(private readonly competitionRepo: CompetitionRepository) {}

  async execute(command: DeleteCompetitionCommand): Promise<void> {
    const competition = await this.competitionRepo.findById(
      command.competitionId,
    );
    if (!competition) {
      throw DomainException.badRequest('Competition', 'Doesnt exist');
    }

    await this.competitionRepo.delete(command.competitionId);
  }
}
