import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Goal } from '../domain/goal.entity';

@Injectable()
export class GoalRepository {
  constructor(
    @InjectRepository(Goal)
    private readonly goalRepo: Repository<Goal>,
  ) {}

  async save(goal: Goal): Promise<Goal> {
    return this.goalRepo.save(goal);
  }
}
