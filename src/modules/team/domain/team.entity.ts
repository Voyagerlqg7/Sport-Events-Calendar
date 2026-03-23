import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Match } from '../../match/domain/match.entity';
import { Player } from '../../player/domain/player.entity';
import {
  CreateTeamDomainDto,
  UpdateTeamDomainDto,
} from './domainDto/teamDomainDto';
import { DomainException } from '../../../core/exceptions/domain.exceptions';

@Entity('teams')
export class Team {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 100 })
  name: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  officialName: string | null;

  @Column({ type: 'varchar', length: 100, unique: true })
  slug: string;

  @Column({ type: 'varchar', length: 10 })
  abbreviation: string;

  @Column({ type: 'varchar', length: 3 })
  teamCountryCode: string;

  @Column({ type: 'int', nullable: true })
  stagePosition: number | null;

  @OneToMany(() => Match, (match) => match.homeTeam)
  homeMatches: Match[];

  @OneToMany(() => Match, (match) => match.awayTeam)
  awayMatches: Match[];

  @OneToMany(() => Player, (player) => player.team)
  players: Player[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  static createInstance(dto: CreateTeamDomainDto): Team {
    const team = new Team();
    team.name = dto.name;
    team.officialName = dto.officialName ?? null;
    team.slug = dto.slug;
    team.abbreviation = dto.abbreviation;
    team.teamCountryCode = dto.teamCountryCode;
    team.stagePosition = dto.stagePosition ?? null;
    return team;
  }

  update(dto: UpdateTeamDomainDto): void {
    const hasChanges =
      (dto.name !== undefined && dto.name !== this.name) ||
      (dto.officialName !== undefined &&
        dto.officialName !== this.officialName) ||
      (dto.slug !== undefined && dto.slug !== this.slug) ||
      (dto.abbreviation !== undefined &&
        dto.abbreviation !== this.abbreviation) ||
      (dto.teamCountryCode !== undefined &&
        dto.teamCountryCode !== this.teamCountryCode) ||
      (dto.stagePosition !== undefined &&
        dto.stagePosition !== this.stagePosition);

    if (!hasChanges) {
      throw DomainException.badRequest('Nothing to update', 'team');
    }

    if (dto.name !== undefined) {
      this.name = dto.name;
    }
    if (dto.officialName !== undefined) {
      this.officialName = dto.officialName;
    }
    if (dto.slug !== undefined) {
      this.slug = dto.slug;
    }
    if (dto.abbreviation !== undefined) {
      this.abbreviation = dto.abbreviation;
    }
    if (dto.teamCountryCode !== undefined) {
      this.teamCountryCode = dto.teamCountryCode;
    }
    if (dto.stagePosition !== undefined) {
      this.stagePosition = dto.stagePosition;
    }
  }
}
