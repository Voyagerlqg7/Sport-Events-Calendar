import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  UpdateDateColumn,
  CreateDateColumn,
  OneToMany,
} from 'typeorm';
import {
  CreateCompetitionDomainDto,
  UpdateCompetitionDomainDto,
} from './domainDto/competitionDomainDto';
import { DomainException } from '../../../core/exceptions/domain.exceptions';
import { Stage } from '../../stage/domain/stage.entity';

@Entity('competitions')
export class Competition {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 100, unique: true })
  originCompetitionId: string;

  @Column({ type: 'varchar', length: 200 })
  originCompetitionName: string;

  @OneToMany(() => Stage, (stage) => stage.competition, { cascade: true })
  stages: Stage[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  static createInstance(dto: CreateCompetitionDomainDto): Competition {
    const competition = new Competition();
    competition.originCompetitionId = dto.originCompetitionId;
    competition.originCompetitionName = dto.originCompetitionName;
    return competition;
  }

  update(dto: UpdateCompetitionDomainDto): void {
    if (
      dto.originCompetitionId === this.originCompetitionId &&
      dto.originCompetitionName === this.originCompetitionName
    ) {
      throw DomainException.badRequest('Nothing to update', 'competition');
    }

    if (dto.originCompetitionId) {
      this.originCompetitionId = dto.originCompetitionId;
    }
    if (dto.originCompetitionName) {
      this.originCompetitionName = dto.originCompetitionName;
    }
  }
}
