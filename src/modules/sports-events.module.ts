import {Column, Entity, OneToMany, PrimaryGeneratedColumn} from 'typeorm';

@Entity()
export class Competition {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column({ type: 'varchar', length: 100, unique: true })
  originCompetitionId: string;

  @Column({ type: 'varchar', length: 200 })
  originCompetitionName: string;

  @OneToMany(()=>Match, match=>)



}
