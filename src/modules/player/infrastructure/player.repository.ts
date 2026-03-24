import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, ILike } from 'typeorm';
import { Player } from '../domain/player.entity';

@Injectable()
export class PlayerRepository {
  constructor(
    @InjectRepository(Player)
    private readonly playerRepo: Repository<Player>,
  ) {}

  async save(player: Player): Promise<Player> {
    return this.playerRepo.save(player);
  }
  async saveMany(player: Player[]): Promise<Player[]> {
    return this.playerRepo.save(player);
  }

  async findById(id: string): Promise<Player | null> {
    return this.playerRepo.findOne({
      where: { id },
    });
  }

  async findByIdWithDetails(id: string): Promise<Player | null> {
    return this.playerRepo.findOne({
      where: { id },
      relations: ['team', 'cards'],
    });
  }

  async findAll(): Promise<Player[]> {
    return this.playerRepo.find({
      relations: ['team'],
      order: { name: 'ASC' },
    });
  }

  async findByTeamId(teamId: string): Promise<Player[]> {
    return this.playerRepo.find({
      where: { teamId },
      relations: ['team'],
      order: { number: 'ASC', name: 'ASC' },
    });
  }

  async searchByName(search: string): Promise<Player[]> {
    return this.playerRepo.find({
      where: { name: ILike(`%${search}%`) },
      relations: ['team'],
      order: { name: 'ASC' },
    });
  }

  async findByPosition(position: string): Promise<Player[]> {
    return this.playerRepo.find({
      where: { position },
      relations: ['team'],
      order: { name: 'ASC' },
    });
  }

  async delete(id: string): Promise<void> {
    await this.playerRepo.delete(id);
  }

  async exists(id: string): Promise<boolean> {
    return this.playerRepo.exists({ where: { id } });
  }

  async countByTeamId(teamId: string): Promise<number> {
    return this.playerRepo.count({ where: { teamId } });
  }
}
