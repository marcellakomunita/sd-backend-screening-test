import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { MovieService } from './movie.service';
import { Movie } from 'src/entity/movie.entity';
import { MovieController } from './movie.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Movie])],
  controllers: [MovieController],
  providers: [MovieService],
})
export class MovieModule {}
