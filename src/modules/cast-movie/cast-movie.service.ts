import { Movie } from './../../entity/movie.entity';
import { CastMovie } from './../../entity/cast-movie.entity';
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class CastMovieService {
  constructor(
    @InjectRepository(CastMovie)
    private castMovieRepository: Repository<CastMovie>,
    @InjectRepository(Movie)
    private movieRepository: Repository<Movie>,
  ) {}

  async findAll(): Promise<CastMovie[]> {
    return this.castMovieRepository.find();
  }

  async findOne(id: bigint): Promise<CastMovie | undefined> {
    return this.castMovieRepository.findOne({ where: { id } });
  }

  async create(castMovie: Partial<CastMovie>): Promise<CastMovie> {
    const newCastMovie = this.castMovieRepository.create(castMovie);
    return this.castMovieRepository.save(newCastMovie);
  }

  async delete(id: bigint): Promise<void> {
    const castMovie = await this.castMovieRepository.findOne({ where: { id } });
    await this.castMovieRepository.delete(castMovie);
  }

  async update(id: bigint, user: Partial<CastMovie>): Promise<CastMovie> {
    await this.castMovieRepository.update(Number(id), user);
    return this.castMovieRepository.findOne({ where: { id } });
  }

  async findMovieWithCasts(): Promise<Movie[]> {
    const movies = await this.movieRepository.find({
      relations: ['castMovie', 'castMovie.cast'],
    });

    const result = movies.map((movie) => ({
      id: movie.id,
      name: movie.name,
      language: movie.language,
      status: movie.status,
      rating: movie.rating,
      casts: movie.castMovie.map((castMovie) => ({
        name: castMovie.cast.name,
        birthday: castMovie.cast.birthday,
        deadday: castMovie.cast.deadday,
      })),
    }));

    return result;
  }
}
