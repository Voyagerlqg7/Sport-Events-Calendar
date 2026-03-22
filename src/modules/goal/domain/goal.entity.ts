import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';

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

  @ManyToOne(() => Result, (result) => result.goals)
  result: Result;

  @ManyToOne(() => Team, { nullable: true })
  team: Team;
}
