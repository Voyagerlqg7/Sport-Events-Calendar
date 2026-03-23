import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Match } from '../domain/match.entity';

@Injectable()
export class MatchRepository {
  constructor(
    @InjectRepository(Match)
    private readonly matchRepo: Repository<Match>,
  ) {}

  async save(match: Match): Promise<Match> {
    return this.matchRepo.save(match);
  }

  async findById(id: string): Promise<Match | null> {
    return this.matchRepo.findOne({
      where: { id },
    });
  }

  async findByIdWithDetails(id: string): Promise<Match | null> {
    return this.matchRepo.findOne({
      where: { id },
      relations: [
        'homeTeam',
        'awayTeam',
        'stage',
        'result',
        'result.goals',
        'result.cards',
      ],
    });
  }

  async findAll(): Promise<Match[]> {
    return this.matchRepo.find();
  }

  async delete(id: string): Promise<void> {
    await this.matchRepo.delete(id);
  }

  async exists(id: string): Promise<boolean> {
    return this.matchRepo.exists({ where: { id } });
  }
}
