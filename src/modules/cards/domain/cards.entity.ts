import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Result } from '../../result/domain/result.entity';
import { Player } from '../../player/domain/player.entity';
import { CreateCardDomainDto } from './dto/card-domain.dto';

@Entity('cards')
export class Card {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'int' })
  minute: number;
  @Column({ type: 'varchar' })
  cardType: 'yellow' | 'second_yellow' | 'direct_red';
  // Result
  @ManyToOne(() => Result, (result) => result.cards)
  @JoinColumn({ name: 'resultId' })
  result: Result;

  @Column({ type: 'uuid' })
  resultId: string;

  // Player
  @ManyToOne(() => Player, (player) => player.cards)
  @JoinColumn({ name: 'playerId' })
  player: Player;
  @Column({ type: 'uuid' })
  playerId: string;

  // Self-reference for second_yellow
  @ManyToOne(() => Card, { nullable: true })
  @JoinColumn({ name: 'relatedYellowCardId' })
  relatedYellowCard: Card;

  @Column({ type: 'uuid', nullable: true })
  relatedYellowCardId: string | null;
  @CreateDateColumn()
  createdAt: Date;
  @UpdateDateColumn()
  updatedAt: Date;

  static createInstance(dto: CreateCardDomainDto): Card {
    const card = new Card();
    card.minute = dto.minute;
    card.cardType = dto.cardType;
    card.resultId = dto.resultId;
    card.playerId = dto.playerId;
    card.relatedYellowCardId = dto.relatedYellowCardId || null;
    return card;
  }
}
