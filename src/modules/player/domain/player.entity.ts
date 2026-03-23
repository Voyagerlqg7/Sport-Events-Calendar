// player/domain/player.entity.ts
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { Team } from '../../team/domain/team.entity';
import { Card } from '../../cards/domain/cards.entity';
import {
  CreatePlayerDomainDto,
  UpdatePlayerDomainDto,
} from './domainDto/playerDomainDto';
import { DomainException } from '../../../core/exceptions/domain.exceptions';

@Entity('players')
export class Player {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar' })
  name: string;

  @Column({ type: 'varchar', nullable: true })
  position: string | null;

  @Column({ type: 'int', nullable: true })
  number: number | null;

  @ManyToOne(() => Team, (team) => team.players)
  @JoinColumn({ name: 'teamId' })
  team: Team | null;

  @Column({ type: 'uuid', nullable: true })
  teamId: string | null;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => Card, (card) => card.player)
  cards: Card[];

  static createInstance(dto: CreatePlayerDomainDto): Player {
    const player = new Player();
    player.name = dto.name;
    player.position = dto.position ?? null;
    player.number = dto.number ?? null;
    player.teamId = dto.teamId ?? null;
    return player;
  }

  update(dto: UpdatePlayerDomainDto): void {
    const hasChanges =
      (dto.name !== undefined && dto.name !== this.name) ||
      (dto.position !== undefined && dto.position !== this.position) ||
      (dto.number !== undefined && dto.number !== this.number) ||
      (dto.teamId !== undefined && dto.teamId !== this.teamId);

    if (!hasChanges) {
      throw DomainException.badRequest('Nothing to update', 'player');
    }

    if (dto.name !== undefined) {
      this.name = dto.name;
    }
    if (dto.position !== undefined) {
      this.position = dto.position;
    }
    if (dto.number !== undefined) {
      this.number = dto.number;
    }
    if (dto.teamId !== undefined) {
      this.teamId = dto.teamId;
    }
  }

  // Вспомогательные методы
  getYellowCards(): Card[] {
    return (
      this.cards?.filter(
        (card) =>
          card.cardType === 'yellow' || card.cardType === 'second_yellow',
      ) || []
    );
  }

  getRedCards(): Card[] {
    return (
      this.cards?.filter(
        (card) =>
          card.cardType === 'direct_red' || card.cardType === 'second_yellow',
      ) || []
    );
  }

  getTotalYellowCards(): number {
    return this.getYellowCards().length;
  }

  getTotalRedCards(): number {
    return this.getRedCards().length;
  }

  wasSentOffInMatch(resultId: string): boolean {
    return (
      this.cards?.some(
        (card) =>
          card.resultId === resultId &&
          (card.cardType === 'direct_red' || card.cardType === 'second_yellow'),
      ) || false
    );
  }
}
