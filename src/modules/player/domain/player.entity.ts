import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { Team } from '../../team/domain/team.entity';
import { Card } from '../../cards/domain/cards.entity';

@Entity('players')
export class Player {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar' })
  name: string;

  @Column({ type: 'varchar', nullable: true })
  position: string;

  @Column({ type: 'int', nullable: true })
  number: number;

  @ManyToOne(() => Team, (team) => team.players)
  team: Team;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => Card, (card) => card.player)
  cards: Card[];

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
