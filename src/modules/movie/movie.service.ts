import { Movie } from '../../entity/movie.entity';
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class MovieService {
  constructor(
    @InjectRepository(Movie)
    private movieRepository: Repository<Movie>,
  ) {}

  async findAll(): Promise<Movie[]> {
    return this.movieRepository.find();
  }

  async findOne(id: bigint): Promise<Movie | undefined> {
    return this.movieRepository.findOne({ where: { id } });
  }

  async create(movie: Partial<Movie>): Promise<Movie> {
    const newMovie = this.movieRepository.create(movie);
    return this.movieRepository.save(newMovie);
  }

  async delete(id: bigint): Promise<void> {
    const movie = await this.movieRepository.findOne({ where: { id } });
    if (movie) {
      await this.movieRepository.remove(movie);
    }
  }

  async update(id: bigint, updatedData: Partial<Movie>): Promise<Movie | null> {
    const movie = await this.movieRepository.findOne({ where: { id } });
    const updatedMovie = this.movieRepository.merge(movie, updatedData);
    return this.movieRepository.save(updatedMovie);
  }
}
