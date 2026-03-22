import {
  Column,
  Entity,
  ManyToOne,
  JoinColumn,
  PrimaryGeneratedColumn,
  OneToOne,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Competition } from '../../sports-events.module';

@Entity('matches')
export class Match {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column({ type: 'int' })
  season: number;
  @Column({ type: 'varchar', length: 20 })
  status: string;
  @Column({ type: 'time' })
  timeVenueUTC: string;

  @Column({ type: 'date' })
  dateVenue: Date;

  @Column({ type: 'varchar', nullable: true })
  stadium: string;

  @ManyToOne(() => Team, { eager: false })
  @JoinColumn({ name: 'homeTeamId' })
  homeTeam: Team;
  @Column({ type: 'uuid' })
  homeTeamId: string;

  @ManyToOne(() => Team, { eager: false })
  @JoinColumn({ name: 'awayTeamId' })
  awayTeam: Team;
  @Column({ type: 'uuid' })
  awayTeamId: string;

  @OneToOne(() => Result, { cascade: true, eager: false })
  @JoinColumn({ name: 'resultId' })
  result: Result;
  @Column({ type: 'uuid', nullable: true })
  resultId: string;

  @ManyToOne(() => Stage, { eager: false })
  @JoinColumn({ name: 'stageId' })
  stage: Stage;
  @Column({ type: 'uuid' })
  stageId: string;

  @ManyToOne(() => Competition, { eager: false })
  @JoinColumn({ name: 'competitionId' })
  competition: Competition;
  @Column({ type: 'uuid' })
  competitionId: string;

  @Column({ type: 'jsonb', nullable: true })
  metadata: any;

  @CreateDateColumn()
  cratedAt: Date;

  @UpdateDateColumn()
  updateAt: Date;
}
