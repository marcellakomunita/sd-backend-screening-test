import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { CastMovie } from 'src/entity/cast-movie.entity';
import { CastMovieController } from './cast-movie.controller';
import { CastMovieService } from './cast-movie.service';
import { Movie } from 'src/entity/movie.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CastMovie, Movie])],
  controllers: [CastMovieController],
  providers: [CastMovieService],
})
export class CastMovieModule {}
