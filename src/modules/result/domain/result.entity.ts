import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('results')
export class Result {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'int' })
  homeGoals: number;

  @Column({ type: 'int' })
  awayGoals: number;

  @Column({ type: 'varchar', length: 100, nullable: true })
  winner: string;

  @Column({ type: 'text', nullable: true })
  message: string;

  @OneToMany(() => Goal, (goal) => goal.result, { cascade: true })
  goals: Goal[];

  @OneToMany(() => YellowCard, (card) => card.result, { cascade: true })
  yellowCards: YellowCard[];

  @OneToMany(() => SecondYellowCard, (card) => card.result, { cascade: true })
  secondYellowCards: SecondYellowCard[];

  @OneToMany(() => DirectRedCard, (card) => card.result, { cascade: true })
  directRedCards: DirectRedCard[];

  @OneToOne(() => Match, (match) => match.result)
  match: Match;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
