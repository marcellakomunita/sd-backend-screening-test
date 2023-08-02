import { Movie } from './../../entity/movie.entity';
import { MovieService } from './movie.service';
import {
  Controller,
  Get,
  Post,
  Delete,
  Put,
  Body,
  Param,
  NotFoundException,
} from '@nestjs/common';

@Controller('movie')
export class MovieController {
  constructor(private movieService: MovieService) {}

  @Get()
  async findAll(): Promise<Movie[]> {
    return this.movieService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: bigint): Promise<Movie | undefined> {
    const movieFound = await this.movieService.findOne(id);
    if (movieFound) {
      return this.movieService.findOne(id);
    }
    throw new NotFoundException('Movie does not exist');
  }

  @Post()
  async create(@Body() movie: Movie): Promise<Movie> {
    return this.movieService.create(movie);
  }

  @Delete(':id')
  async delete(@Param('id') id: bigint): Promise<void> {
    const movieFound = await this.movieService.findOne(id);
    if (movieFound) {
      return this.movieService.delete(id);
    }
    throw new NotFoundException('Movie does not exist');
  }

  @Put(':id')
  async update(
    @Param('id') id: bigint,
    @Body() movie: Movie,
  ): Promise<Movie | null> {
    const movieFound = await this.movieService.findOne(id);
    if (movieFound) {
      return this.movieService.update(id, movie);
    }
    throw new NotFoundException('Movie does not exist');
  }
}
