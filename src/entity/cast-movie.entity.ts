import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Cast } from './cast.entity';
import { Movie } from './movie.entity';

@Entity({ name: 'cast_movie' })
export class CastMovie {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: bigint;

  @Column({ type: 'bigint' })
  cast_id: bigint;

  @Column({ type: 'bigint' })
  movie_id: bigint;

  @ManyToOne(() => Cast, (cast) => cast.castMovie, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'cast_id', referencedColumnName: 'id' })
  cast: Cast;

  @ManyToOne(() => Movie, (movie) => movie.castMovie, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'movie_id', referencedColumnName: 'id' })
  movie: Movie;
}
