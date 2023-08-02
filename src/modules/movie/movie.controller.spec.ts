import { MovieController } from './movie.controller';
import { Test, TestingModule } from '@nestjs/testing';
import { MovieService } from './movie.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Movie } from './../../entity/movie.entity';
import { Repository } from 'typeorm';
import { NotFoundException } from '@nestjs/common';

describe('MovieController', () => {
  let movieController: MovieController;
  let movieService: MovieService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MovieController],
      providers: [
        MovieService,
        {
          provide: getRepositoryToken(Movie),
          useClass: Repository,
        },
      ],
    }).compile();

    movieController = module.get<MovieController>(MovieController);
    movieService = module.get<MovieService>(MovieService);
  });

  describe('findAll', () => {
    it('should return an array of movie objects', async () => {
      const testData = [
        {
          id: BigInt(1),
          name: 'test',
          language: 'Indonesian',
          status: 'ended',
          rating: 3,
        },
      ];
      jest.spyOn(movieService, 'findAll').mockResolvedValue(testData);
      const result = await movieController.findAll();
      expect(result).toEqual(testData);
    });
  });

  describe('findOne', () => {
    it('should return a movie object', async () => {
      const testData = {
        id: BigInt(1),
        name: 'test',
        language: 'Indonesian',
        status: 'ended',
        rating: 3,
      };
      jest.spyOn(movieService, 'findOne').mockResolvedValue(testData);
      const result = await movieController.findOne(BigInt(1));
      expect(result).toEqual(testData);
    });
  });

  describe('create', () => {
    it('should create a new movie', async () => {
      const testData = {
        id: BigInt(2),
        name: 'test',
        language: 'Indonesian',
        status: 'ended',
        rating: 3,
      };
      jest.spyOn(movieService, 'create').mockResolvedValue(testData);
      const result = await movieController.create(testData);
      expect(result).toEqual(testData);
    });
  });

  describe('update', () => {
    it('should return an updated movie object', async () => {
      const existingMovie: Movie = {
        id: BigInt(1),
        name: 'Test Movie',
        language: 'Indonesian',
        status: 'ended',
        rating: 1,
      };
      const updatedData: Partial<Movie> = {
        name: 'updatedtestMovie',
      };
      const updatedMovie: Movie = {
        ...existingMovie,
        ...updatedData,
      };
      jest.spyOn(movieService, 'findOne').mockResolvedValue(existingMovie);
      jest.spyOn(movieService, 'update').mockResolvedValue(updatedMovie);
      const result = await movieController.update(
        existingMovie.id,
        updatedMovie as Movie,
      );
      expect(result).toEqual(updatedMovie);
    });
  });

  describe('delete', () => {
    it('should delete a movie object', async () => {
      jest.spyOn(movieService, 'delete').mockResolvedValue(undefined);
      jest
        .spyOn(movieService, 'findOne')
        .mockRejectedValue(new NotFoundException('Movie does not exist'));

      await expect(movieController.delete(BigInt(1))).rejects.toThrow(
        NotFoundException,
      );
    });
  });
});
