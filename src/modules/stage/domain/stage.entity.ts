import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Match } from '../../match/domain/match.entity';

@Entity('stages')
export class Stage {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 50 })
  stageId: string; // 'ROUND OF 16', 'QUARTER_FINAL', etc.

  @Column({ type: 'varchar', length: 100 })
  name: string;

  @Column({ type: 'int' })
  ordering: number;

  @OneToMany(() => Match, (match) => match.stage)
  matches: Match[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
