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
import { Team } from '../../team/domain/team.entity';
import { Result } from '../../result/domain/result.entity';
import { Stage } from '../../stage/domain/stage.entity';
import {
  CreateMatchDomainDto,
  UpdateMatchDomainDto,
} from './domainDto/matchDomainDto';
import { DomainException } from '../../../core/exceptions/domain.exceptions';

@Entity('matches')
export class Match {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'int' })
  season: number;

  @Column({ type: 'varchar', length: 20 })
  status: string; // 'scheduled', 'live', 'finished'

  @Column({ type: 'time' })
  timeVenueUTC: string;

  @Column({ type: 'date' })
  dateVenue: Date;

  @Column({ type: 'int', nullable: true })
  group: number | null;

  @Column({ type: 'varchar', nullable: true })
  stadium: string | null;

  // Teams
  @ManyToOne(() => Team)
  @JoinColumn({ name: 'homeTeamId' })
  homeTeam: Team;
  @Column({ type: 'uuid' })
  homeTeamId: string;

  @ManyToOne(() => Team)
  @JoinColumn({ name: 'awayTeamId' })
  awayTeam: Team;
  @Column({ type: 'uuid' })
  awayTeamId: string;

  // Stage
  @ManyToOne(() => Stage, (stage) => stage.matches)
  @JoinColumn({ name: 'stageId' })
  stage: Stage;
  @Column({ type: 'uuid' })
  stageId: string;

  // Result
  @OneToOne(() => Result, { cascade: true })
  @JoinColumn({ name: 'resultId' })
  result: Result;
  @Column({ type: 'uuid', nullable: true })
  resultId: string;

  @Column({ type: 'jsonb', nullable: true })
  metadata: any;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  static createInstance(dto: CreateMatchDomainDto): Match {
    const match = new Match();
    match.season = dto.season;
    match.status = dto.status;
    match.timeVenueUTC = dto.timeVenueUTC;
    match.dateVenue = dto.dateVenue;
    match.group = dto.group ?? null;
    match.stadium = dto.stadium ?? null;
    match.homeTeamId = dto.homeTeamId;
    match.awayTeamId = dto.awayTeamId;
    match.stageId = dto.stageId;
    return match;
  }

  update(dto: UpdateMatchDomainDto): void {
    const hasChanges =
      (dto.season !== undefined && dto.season !== this.season) ||
      (dto.status !== undefined && dto.status !== this.status) ||
      (dto.timeVenueUTC !== undefined &&
        dto.timeVenueUTC !== this.timeVenueUTC) ||
      (dto.dateVenue !== undefined && dto.dateVenue !== this.dateVenue) ||
      (dto.group !== undefined && dto.group !== this.group) ||
      (dto.stadium !== undefined && dto.stadium !== this.stadium) ||
      (dto.homeTeamId !== undefined && dto.homeTeamId !== this.homeTeamId) ||
      (dto.awayTeamId !== undefined && dto.awayTeamId !== this.awayTeamId) ||
      (dto.stageId !== undefined && dto.stageId !== this.stageId);

    if (!hasChanges) {
      throw DomainException.badRequest('Nothing to update', 'match');
    }
    if (dto.season !== undefined) {
      this.season = dto.season;
    }
    if (dto.status !== undefined) {
      this.status = dto.status;
    }
    if (dto.timeVenueUTC !== undefined) {
      this.timeVenueUTC = dto.timeVenueUTC;
    }
    if (dto.dateVenue !== undefined) {
      this.dateVenue = dto.dateVenue;
    }
    if (dto.group !== undefined) {
      this.group = dto.group;
    }
    if (dto.stadium !== undefined) {
      this.stadium = dto.stadium;
    }
    if (dto.homeTeamId !== undefined) {
      this.homeTeamId = dto.homeTeamId;
    }
    if (dto.awayTeamId !== undefined) {
      this.awayTeamId = dto.awayTeamId;
    }
    if (dto.stageId !== undefined) {
      this.stageId = dto.stageId;
    }
  }
}
