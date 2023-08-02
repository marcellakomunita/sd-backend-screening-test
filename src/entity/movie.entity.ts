import { CastMovie } from './cast-movie.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Movie {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: bigint;

  @Column({ length: 100 })
  name: string;

  @Column({ length: 30 })
  language: string;

  @Column({ length: 10 })
  status: string;

  @Column({ type: 'float', precision: 2, scale: 1 })
  rating: number;

  @OneToMany(() => CastMovie, (castMovie) => castMovie.movie, { cascade: true })
  castMovie?: CastMovie[];
}
