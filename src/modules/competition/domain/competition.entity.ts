import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  UpdateDateColumn,
  CreateDateColumn,
  OneToMany,
} from 'typeorm';
import { Match } from '../../match/domain/match.entity';

@Entity('competitions')
export class Competition {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 100, unique: true })
  originCompetitionId: string; // 'afc-champions-league'

  @Column({ type: 'varchar', length: 200 })
  originCompetitionName: string; // 'AFC Champions League'

  @OneToMany(() => Match, (match) => match.competition)
  matches: Match[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
