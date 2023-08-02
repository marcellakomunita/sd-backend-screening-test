import { CastController } from './cast.controller';
import { Test, TestingModule } from '@nestjs/testing';
import { CastService } from './cast.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Cast } from './../../entity/cast.entity';
import { Repository } from 'typeorm';
import { NotFoundException } from '@nestjs/common';

describe('CastController', () => {
  let castController: CastController;
  let castService: CastService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CastController],
      providers: [
        CastService,
        {
          provide: getRepositoryToken(Cast),
          useClass: Repository,
        },
      ],
    }).compile();

    castController = module.get<CastController>(CastController);
    castService = module.get<CastService>(CastService);
  });

  describe('findAll', () => {
    it('should return an array of cast objects', async () => {
      const testData = [
        {
          id: BigInt(1),
          name: 'test',
          birthday: new Date('2003-01-01'),
          deadday: new Date('2023-01-01'),
          rating: 1.0,
        },
      ];
      jest.spyOn(castService, 'findAll').mockResolvedValue(testData);
      const result = await castController.findAll();
      expect(result).toEqual(testData);
    });
  });

  describe('findOne', () => {
    it('should return a cast object', async () => {
      const testData = {
        id: BigInt(1),
        name: 'test',
        birthday: new Date('2003-01-01'),
        deadday: new Date('2023-01-01'),
        rating: 1.0,
      };
      jest.spyOn(castService, 'findOne').mockResolvedValue(testData);
      const result = await castController.findOne(BigInt(1));
      expect(result).toEqual(testData);
    });
  });

  describe('create', () => {
    it('should create a new cast', async () => {
      const testData = {
        id: BigInt(2),
        name: 'test',
        birthday: new Date('2003-01-01'),
        deadday: new Date('2023-01-01'),
        rating: 1.0,
      };
      jest.spyOn(castService, 'create').mockResolvedValue(testData);
      const result = await castController.create(testData);
      expect(result).toEqual(testData);
    });
  });

  describe('update', () => {
    it('should return an updated cast object', async () => {
      const existingCast: Cast = {
        id: BigInt(1),
        name: 'Test Cast',
        birthday: new Date('2003-01-01'),
        deadday: new Date('2023-12-31'),
        rating: 4.5,
      };
      const updatedData: Partial<Cast> = {
        name: 'updatedtest',
      };
      const updatedCast: Cast = {
        ...existingCast,
        ...updatedData,
      };
      jest.spyOn(castService, 'findOne').mockResolvedValue(existingCast);
      jest.spyOn(castService, 'update').mockResolvedValue(updatedCast);
      const result = await castController.update(
        existingCast.id,
        updatedCast as Cast,
      );
      expect(result).toEqual(updatedCast);
    });
  });

  describe('delete', () => {
    it('should delete a cast object', async () => {
      jest.spyOn(castService, 'delete').mockResolvedValue(undefined);
      jest
        .spyOn(castService, 'findOne')
        .mockRejectedValue(new NotFoundException('Cast does not exist'));

      await expect(castController.delete(BigInt(1))).rejects.toThrow(
        NotFoundException,
      );
    });
  });
});
