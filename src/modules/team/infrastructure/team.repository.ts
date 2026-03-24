import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, ILike, In } from 'typeorm';
import { Team } from '../domain/team.entity';

@Injectable()
export class TeamRepository {
  constructor(
    @InjectRepository(Team)
    private readonly teamRepo: Repository<Team>,
  ) {}

  async save(team: Team): Promise<Team> {
    return this.teamRepo.save(team);
  }

  async saveMany(teams: Team[]): Promise<Team[]> {
    return this.teamRepo.save(teams);
  }

  async findById(id: string): Promise<Team | null> {
    return this.teamRepo.findOne({
      where: { id },
    });
  }
  async findByIds(ids: string[]): Promise<Team[]> {
    if (ids.length === 0) return [];
    return this.teamRepo.find({
      where: { id: In(ids) },
    });
  }

  async findByIdWithDetails(id: string): Promise<Team | null> {
    return this.teamRepo.findOne({
      where: { id },
      relations: ['players', 'homeMatches', 'awayMatches'],
    });
  }

  async findAll(): Promise<Team[]> {
    return this.teamRepo.find({
      order: { name: 'ASC' },
    });
  }

  async findBySlug(slug: string): Promise<Team | null> {
    return this.teamRepo.findOne({
      where: { slug },
    });
  }

  async findByCountryCode(countryCode: string): Promise<Team[]> {
    return this.teamRepo.find({
      where: { teamCountryCode: countryCode },
      order: { name: 'ASC' },
    });
  }

  async searchByName(search: string): Promise<Team[]> {
    return this.teamRepo.find({
      where: [
        { name: ILike(`%${search}%`) },
        { officialName: ILike(`%${search}%`) },
      ],
      order: { name: 'ASC' },
    });
  }

  async delete(id: string): Promise<void> {
    await this.teamRepo.delete(id);
  }

  async exists(id: string): Promise<boolean> {
    return this.teamRepo.exists({ where: { id } });
  }

  async existsBySlug(slug: string): Promise<boolean> {
    return this.teamRepo.exists({ where: { slug } });
  }
}
