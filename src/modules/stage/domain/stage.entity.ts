import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Match } from '../../match/domain/match.entity';
import { Competition } from '../../competition/domain/competition.entity';
import {
  CreateStageDomainDto,
  UpdateStageDomainDto,
} from './domainDto/stageDomainDto';
import { DomainException } from '../../../core/exceptions/domain.exceptions';

@Entity('stages')
export class Stage {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 50 })
  code: string; // 'GROUP_STAGE', 'ROUND_OF_16', 'QUARTER_FINAL'

  @Column({ type: 'varchar', length: 100 })
  name: string; // 'Group Stage', 'Round of 16', 'Quarter Final'

  @Column({ type: 'int' })
  ordering: number;

  @ManyToOne(() => Competition, (competition) => competition.stages)
  @JoinColumn({ name: 'competitionId' })
  competition: Competition;

  @Column({ type: 'uuid' })
  competitionId: string;

  @OneToMany(() => Match, (match) => match.stage, { cascade: true })
  matches: Match[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  static createInstance(dto: CreateStageDomainDto): Stage {
    const stage = new Stage();
    stage.code = dto.code;
    stage.name = dto.name;
    stage.ordering = dto.ordering;
    stage.competitionId = dto.competitionId;
    return stage;
  }

  update(dto: UpdateStageDomainDto): void {
    const hasChanges =
      (dto.code !== undefined && dto.code !== this.code) ||
      (dto.name !== undefined && dto.name !== this.name) ||
      (dto.ordering !== undefined && dto.ordering !== this.ordering) ||
      (dto.competitionId !== undefined &&
        dto.competitionId !== this.competitionId);

    if (!hasChanges) {
      throw DomainException.badRequest('Nothing to update', 'stage');
    }

    if (dto.code !== undefined) {
      this.code = dto.code;
    }
    if (dto.name !== undefined) {
      this.name = dto.name;
    }
    if (dto.ordering !== undefined) {
      this.ordering = dto.ordering;
    }
    if (dto.competitionId !== undefined) {
      this.competitionId = dto.competitionId;
    }
  }
}
