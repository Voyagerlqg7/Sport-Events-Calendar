import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  JoinColumn,
  ManyToOne,
} from 'typeorm';
import { Result } from '../../result/domain/result.entity';
import { Player } from '../../player/domain/player.entity';

@Entity('cards')
export class Card {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Result, (result) => result.cards)
  @JoinColumn({ name: 'resultId' })
  result: Result;
  @Column({ type: 'uuid' })
  resultId: string;

  @ManyToOne(() => Player, (player) => player.cards)
  @JoinColumn({ name: 'playerId' })
  player: Player;
  @Column({ type: 'uuid' })
  playerId: string;

  @Column({ type: 'int' })
  minute: number;

  @Column({ type: 'varchar' })
  cardType: 'yellow' | 'second_yellow' | 'direct_red';

  @Column({ type: 'uuid', nullable: true })
  relatedYellowCardId: string;
}
