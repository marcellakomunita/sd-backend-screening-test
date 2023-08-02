import { CastMovie } from './../../entity/cast-movie.entity';
import { Movie } from './../../entity/movie.entity';
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
import { CastMovieService } from './cast-movie.service';

@Controller('castMovie')
export class CastMovieController {
  constructor(private castMovieService: CastMovieService) {}

  @Get()
  async findAll(): Promise<CastMovie[]> {
    return this.castMovieService.findAll();
  }

  // async findAll(): Promise<CastMovie[]> {
  //   try {
  //     return await this.castMovieService.findAll();
  //   } catch (error) {
  //     throw new InternalServerErrorException('Failed to fetch data');
  //   }
  // }

  @Get('/casts')
  async findMovieWithCasts(): Promise<Movie[] | undefined> {
    return this.castMovieService.findMovieWithCasts();
  }

  @Get(':id')
  async findOne(@Param('id') id: bigint): Promise<CastMovie | undefined> {
    const castMovie = await this.castMovieService.findOne(id);
    if (castMovie) {
      return this.castMovieService.findOne(id);
    }
    throw new NotFoundException('CastMovie does not exist');
  }

  @Post()
  async create(@Body() castMovie: CastMovie): Promise<CastMovie> {
    return this.castMovieService.create(castMovie);
  }

  @Delete(':id')
  async delete(@Param('id') id: bigint): Promise<void> {
    const castMovie = await this.castMovieService.findOne(id);
    if (castMovie) {
      return this.castMovieService.delete(id);
    }
    throw new NotFoundException('CastMovie does not exist');
  }

  @Put(':id')
  async update(
    @Param('id') id: bigint,
    @Body() castMovie: CastMovie,
  ): Promise<CastMovie | null> {
    const castMovieFound = await this.castMovieService.findOne(id);
    if (castMovieFound) {
      return this.castMovieService.update(id, castMovie);
    }
    throw new NotFoundException('CastMovie does not exist');
  }
}
