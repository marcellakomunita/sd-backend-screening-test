import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { CastMovie } from './cast-movie.entity';

@Entity()
export class Cast {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: bigint;

  @Column({ length: 100 })
  name: string;

  @Column({ type: 'timestamp' })
  birthday: Date;

  @Column({ type: 'timestamp', nullable: true })
  deadday: Date;

  @Column()
  rating: number;

  @OneToMany(() => CastMovie, (castMovie) => castMovie.cast, { cascade: true })
  castMovie?: CastMovie[];
}
