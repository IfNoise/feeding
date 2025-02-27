import { Test, TestingModule } from '@nestjs/testing';
import { FertilizerController } from './fertilizer.controller';
import { FertilizerService } from './fertilizer.service';
import {
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
import { Fertilizer } from 'src/schemas/fertilizer.schema';
import {
  CreateFertilizerDto,
  FertilizerType,
} from './dto/create-fertilizer.dto';

describe('FertilizerController', () => {
  let fertilizerController: FertilizerController;
  let fertilizerService: FertilizerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FertilizerController],
      providers: [
        {
          provide: FertilizerService,
          useValue: {
            createFertilizer: jest.fn(),
            findAll: jest.fn(),
            findOne: jest.fn(),
            updateFertilizer: jest.fn(),
            deleteFertilizer: jest.fn(),
          },
        },
      ],
    }).compile();

    fertilizerController =
      module.get<FertilizerController>(FertilizerController);
    fertilizerService = module.get<FertilizerService>(FertilizerService);
  });

  describe('createFertilizer', () => {
    it('should create a new fertilizer', async () => {
      const createFertilizerDto: CreateFertilizerDto = {
        name: 'Test Fertilizer',
        description: 'Test Description',
        type: FertilizerType.SOLID,
      };
      const result: Fertilizer = {
        name: 'Test Fertilizer',
        description: 'Test Description',
        type: FertilizerType.SOLID,
        elements: [],
        content: [],
        price: 0,
        aniones: 0,
        kationes: 0,
      };
      jest
        .spyOn(fertilizerService, 'createFertilizer')
        .mockResolvedValue(result);

      expect(
        await fertilizerController.createFertilizer(createFertilizerDto),
      ).toBe(result);
    });

    it('should throw InternalServerErrorException if creation fails', async () => {
      const createFertilizerDto = { name: 'Test Fertilizer' };
      jest
        .spyOn(fertilizerService, 'createFertilizer')
        .mockRejectedValue(new Error());

      await expect(
        fertilizerController.createFertilizer(createFertilizerDto),
      ).rejects.toThrow(InternalServerErrorException);
    });
  });

  describe('findAll', () => {
    it('should return an array of fertilizers', async () => {
      const result = [
        {
          name: 'Test Fertilizer',
          description: 'Test Description',
          type: FertilizerType.SOLID,
          elements: [],
          content: [],
          price: 0,
          aniones: 0,
          kationes: 0,
        },
      ];
      jest.spyOn(fertilizerService, 'findAll').mockResolvedValue(result);

      expect(await fertilizerController.findAll()).toBe(result);
    });

    it('should throw InternalServerErrorException if retrieval fails', async () => {
      jest.spyOn(fertilizerService, 'findAll').mockRejectedValue(new Error());

      await expect(fertilizerController.findAll()).rejects.toThrow(
        InternalServerErrorException,
      );
    });
  });

  describe('findOne', () => {
    it('should return a single fertilizer', async () => {
      const result: Fertilizer = {
        name: 'Test Fertilizer',
        description: 'Test Description',
        type: FertilizerType.SOLID,
        elements: [],
        content: [],
        price: 0,
        aniones: 0,
        kationes: 0,
      };
      jest.spyOn(fertilizerService, 'findOne').mockResolvedValue(result);

      expect(await fertilizerController.findOne({ id: '1' })).toBe(result);
    });

    it('should throw NotFoundException if fertilizer is not found', async () => {
      jest.spyOn(fertilizerService, 'findOne').mockResolvedValue(null);

      await expect(fertilizerController.findOne({ id: '1' })).rejects.toThrow(
        NotFoundException,
      );
    });

    it('should throw InternalServerErrorException if retrieval fails', async () => {
      jest.spyOn(fertilizerService, 'findOne').mockRejectedValue(new Error());

      await expect(fertilizerController.findOne({ id: '1' })).rejects.toThrow(
        InternalServerErrorException,
      );
    });
  });

  describe('updateFertilizer', () => {
    it('should update a fertilizer', async () => {
      const updateFertilizerDto = { name: 'Updated Fertilizer' };
      const result = {
        name: 'Test Fertilizer',
        description: 'Test Description',
        type: FertilizerType.SOLID,
        elements: [],
        content: [],
        price: 0,
        aniones: 0,
        kationes: 0,
        ...updateFertilizerDto,
      };
      jest
        .spyOn(fertilizerService, 'updateFertilizer')
        .mockResolvedValue(result);

      expect(
        await fertilizerController.updateFertilizer('1', updateFertilizerDto),
      ).toBe(result);
    });

    it('should throw InternalServerErrorException if update fails', async () => {
      const updateFertilizerDto = { name: 'Updated Fertilizer' };
      jest
        .spyOn(fertilizerService, 'updateFertilizer')
        .mockRejectedValue(new Error());

      await expect(
        fertilizerController.updateFertilizer('1', updateFertilizerDto),
      ).rejects.toThrow(InternalServerErrorException);
    });
  });

  describe('deleteFertilizer', () => {
    it('should delete a fertilizer', async () => {
      const result = {
        name: 'Test Fertilizer',
        description: 'Test Description',
        type: FertilizerType.SOLID,
        elements: [],
        content: [],
        price: 0,
        aniones: 0,
        kationes: 0,
      };
      jest
        .spyOn(fertilizerService, 'deleteFertilizer')
        .mockResolvedValue(result);

      expect(await fertilizerController.deleteFertilizer('1')).toBe(result);
    });

    it('should throw InternalServerErrorException if deletion fails', async () => {
      jest
        .spyOn(fertilizerService, 'deleteFertilizer')
        .mockRejectedValue(new Error());

      await expect(fertilizerController.deleteFertilizer('1')).rejects.toThrow(
        InternalServerErrorException,
      );
    });
  });
});
