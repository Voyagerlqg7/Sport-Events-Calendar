import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Result } from '../../result/domain/result.entity';
import { Team } from '../../team/domain/team.entity';
import { Player } from '../../player/domain/player.entity';

@Entity('goals')
export class Goal {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 100 })
  playerName: string;

  @Column({ type: 'int' })
  minute: number;

  @Column({ type: 'varchar', length: 20, nullable: true })
  type: string; // 'penalty', 'own', 'regular'

  @ManyToOne(() => Result)
  @JoinColumn({ name: 'resultId' })
  result: Result;
  @Column({ type: 'uuid' })
  resultId: string;

  @ManyToOne(() => Player)
  @JoinColumn({ name: 'playerId' })
  player: Player;
  @Column({ type: 'uuid' })
  playerId: string;

  @ManyToOne(() => Team, { nullable: true })
  @JoinColumn({ name: 'teamId' })
  team: Team;
  @Column({ type: 'uuid', nullable: true })
  teamId: string;
}
