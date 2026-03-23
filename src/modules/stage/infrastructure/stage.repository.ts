import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Stage } from '../domain/stage.entity';

@Injectable()
export class StageRepository {
  constructor(
    @InjectRepository(Stage)
    private readonly stageRepo: Repository<Stage>,
  ) {}

  async save(stage: Stage): Promise<Stage> {
    return this.stageRepo.save(stage);
  }

  async findById(id: string): Promise<Stage | null> {
    return this.stageRepo.findOne({
      where: { id },
    });
  }

  async findByIdWithMatches(id: string): Promise<Stage | null> {
    return this.stageRepo.findOne({
      where: { id },
      relations: ['matches', 'matches.homeTeam', 'matches.awayTeam'],
      order: {
        matches: {
          dateVenue: 'ASC',
        },
      },
    });
  }

  async findAll(): Promise<Stage[]> {
    return this.stageRepo.find({
      order: { ordering: 'ASC' },
    });
  }

  async findByCompetitionId(competitionId: string): Promise<Stage[]> {
    return this.stageRepo.find({
      where: { competitionId },
      order: { ordering: 'ASC' },
    });
  }

  async delete(id: string): Promise<void> {
    await this.stageRepo.delete(id);
  }

  async exists(id: string): Promise<boolean> {
    return this.stageRepo.exists({ where: { id } });
  }
}
