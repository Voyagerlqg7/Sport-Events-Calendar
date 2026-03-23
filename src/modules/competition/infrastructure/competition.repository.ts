import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Competition } from '../domain/competition.entity';

@Injectable()
export class CompetitionRepository {
  constructor(
    @InjectRepository(Competition)
    private readonly competitionRepo: Repository<Competition>,
  ) {}

  async save(competition: Competition): Promise<Competition> {
    return this.competitionRepo.save(competition);
  }

  async findById(id: string): Promise<Competition | null> {
    return this.competitionRepo.findOne({
      where: { id },
    });
  }

  async findByIdWithStages(id: string): Promise<Competition | null> {
    return this.competitionRepo.findOne({
      where: { id },
      relations: ['stages'],
    });
  }

  async findByIdWithFullHierarchy(id: string): Promise<Competition | null> {
    return this.competitionRepo.findOne({
      where: { id },
      relations: ['stages', 'stages.matches'],
    });
  }

  async findByIdWithMatchesAndTeams(id: string): Promise<Competition | null> {
    return this.competitionRepo.findOne({
      where: { id },
      relations: [
        'stages',
        'stages.matches',
        'stages.matches.homeTeam',
        'stages.matches.awayTeam',
        'stages.matches.result',
      ],
    });
  }

  async findByOriginId(originId: string): Promise<Competition | null> {
    return this.competitionRepo.findOne({
      where: { originCompetitionId: originId },
    });
  }

  async findByOriginIdWithStages(
    originId: string,
  ): Promise<Competition | null> {
    return this.competitionRepo.findOne({
      where: { originCompetitionId: originId },
      relations: ['stages'],
    });
  }

  async findAll(): Promise<Competition[]> {
    return this.competitionRepo.find();
  }

  async findAllWithStages(): Promise<Competition[]> {
    return this.competitionRepo.find({
      relations: ['stages'],
    });
  }

  async findAllWithFullHierarchy(): Promise<Competition[]> {
    return this.competitionRepo.find({
      relations: ['stages', 'stages.matches'],
    });
  }

  async delete(id: string): Promise<void> {
    await this.competitionRepo.delete(id);
  }

  async exists(id: string): Promise<boolean> {
    return this.competitionRepo.exists({ where: { id } });
  }
}
