import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  OneToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Goal } from '../../goal/domain/goal.entity';
import { Match } from '../../match/domain/match.entity';
import { Card } from '../../cards/domain/cards.entity';

@Entity('results')
export class Result {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'int', default: 0 })
  homeGoals: number;

  @Column({ type: 'int', default: 0 })
  awayGoals: number;

  @Column({ type: 'varchar', length: 100, nullable: true })
  winner: string | null;

  @Column({ type: 'text', nullable: true })
  message: string | null;

  @OneToMany(() => Goal, (goal) => goal.result, { cascade: true })
  goals: Goal[];

  @OneToMany(() => Card, (card) => card.result, { cascade: true })
  cards: Card[];

  @OneToOne(() => Match, (match) => match.result)
  @JoinColumn()
  match: Match;

  @Column({ type: 'uuid' })
  matchId: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  //TODO: move these methods into repository
  getYellowCards(): Card[] {
    return this.cards?.filter((card) => card.cardType === 'yellow') || [];
  }

  getSecondYellowCards(): Card[] {
    return (
      this.cards?.filter((card) => card.cardType === 'second_yellow') || []
    );
  }

  getDirectRedCards(): Card[] {
    return this.cards?.filter((card) => card.cardType === 'direct_red') || [];
  }

  getAllRedCards(): Card[] {
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

  getTotalSecondYellowCards(): number {
    return this.getSecondYellowCards().length;
  }

  getTotalDirectRedCards(): number {
    return this.getDirectRedCards().length;
  }

  getTotalRedCards(): number {
    return this.getAllRedCards().length;
  }

  getTotalCards(): number {
    return this.cards?.length || 0;
  }

  getCardsByPlayer(playerId: string): Card[] {
    return this.cards?.filter((card) => card.playerId === playerId) || [];
  }
}
