import { CastMovieController } from './cast-movie.controller';
import { Test, TestingModule } from '@nestjs/testing';
import { CastMovieService } from './cast-movie.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CastMovie } from './../../entity/cast-movie.entity';
import { Repository } from 'typeorm';
import { Movie } from './../../entity/movie.entity';

describe('CastMovieController', () => {
  let castMovieController: CastMovieController;
  let castMovieService: CastMovieService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CastMovieController],
      providers: [
        CastMovieService,
        {
          provide: getRepositoryToken(CastMovie),
          useClass: Repository,
        },
        {
          provide: getRepositoryToken(Movie),
          useClass: Repository,
        },
      ],
    }).compile();

    castMovieController = module.get<CastMovieController>(CastMovieController);
    castMovieService = module.get<CastMovieService>(CastMovieService);
  });

  describe('findMovieWithCasts', () => {
    it('should return an array of movie objects with array of its casts', async () => {
      const testData = [
        {
          id: BigInt(1),
          name: 'Avengers: End Game',
          language: 'English',
          status: 'Ended',
          rating: 4.5,
          casts: [{ name: 'Komeng', birthday: '25-08-1970', deadday: null }],
          castMovie: [],
        },
      ];
      jest
        .spyOn(castMovieService, 'findMovieWithCasts')
        .mockResolvedValue(testData);
      const result = await castMovieController.findMovieWithCasts();
      expect(result).toEqual(testData);
    });
  });
});
