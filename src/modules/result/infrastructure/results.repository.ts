import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Result } from '../domain/result.entity';

@Injectable()
export class ResultRepository {
  constructor(
    @InjectRepository(Result)
    private readonly resultRepo: Repository<Result>,
  ) {}

  async createEmpty(matchId: string): Promise<Result> {
    const result = new Result();
    result.homeGoals = 0;
    result.awayGoals = 0;
    result.winner = null;
    result.message = null;
    result.matchId = matchId;
    result.goals = [];
    result.cards = [];
    return this.resultRepo.save(result);
  }

  async save(card: Result): Promise<Result> {
    return this.resultRepo.save(card);
  }
}
