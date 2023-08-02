import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { CastMovie } from './entity/cast-movie.entity';
import { Cast } from './entity/cast.entity';
import { Movie } from './entity/movie.entity';
import { CastModule } from './modules/cast/cast.module';
import { MovieModule } from './modules/movie/movie.module';
import { CastMovieModule } from './modules/cast-movie/cast-movie.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'mysql' as const,
        host: configService.get<string>('DB_HOST'),
        port: parseInt(configService.get<string>('DB_PORT')),
        username: configService.get<string>('DB_USERNAME'),
        password: configService.get<string>('DB_PASSWORD'),
        database: configService.get<string>('DB_DATABASE'),
        entities: [Cast, Movie, CastMovie],
        synchronize: true,
        autoLoadEntities: true,
      }),
      inject: [ConfigService],
    }),
    CastModule,
    MovieModule,
    CastMovieModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor(private dataSource: DataSource) {}
}
