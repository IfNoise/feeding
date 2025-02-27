import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { FertilizerService } from './fertilizer.service';
import {
  Concentrate,
  ConcentrateDocument,
} from 'src/schemas/concentrate.schema';
import { Fertilizer, FertilizerDocument } from 'src/schemas/fertilizer.schema';
import { NotFoundException } from '@nestjs/common';
import { Model } from 'mongoose';

const mockConcentrateModel = {
  findById: jest.fn(),
  save: jest.fn(),
};

const mockFertilizerModel = {
  findById: jest.fn(),
};

describe('FertilizerService', () => {
  let service: FertilizerService;
  let concentrateModel: Model<ConcentrateDocument>;
  let fertilizerModel: Model<FertilizerDocument>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FertilizerService,
        {
          provide: getModelToken(Concentrate.name),
          useValue: mockConcentrateModel,
        },
        {
          provide: getModelToken(Fertilizer.name),
          useValue: mockFertilizerModel,
        },
      ],
    }).compile();

    service = module.get<FertilizerService>(FertilizerService);
    concentrateModel = module.get<Model<ConcentrateDocument>>(
      getModelToken(Concentrate.name),
    );
    fertilizerModel = module.get<Model<FertilizerDocument>>(
      getModelToken(Fertilizer.name),
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of fertilizers', async () => {
      const concentrateId = 'someConcentrateId';
      const mockConcentrate = {
        fertilizers: [
          { fertilizer: 'fertilizerId1' },
          { fertilizer: 'fertilizerId2' },
        ],
      };
      const mockFertilizers = [
        { _id: 'fertilizerId1' },
        { _id: 'fertilizerId2' },
      ];

      concentrateModel.findById.mockResolvedValue(mockConcentrate);
      fertilizerModel.findById.mockImplementation((id) => {
        return mockFertilizers.find((f) => f._id === id);
      });

      const result = await service.findAll(concentrateId);
      expect(result).toEqual(mockFertilizers);
    });
  });

  describe('addFertilizer', () => {
    it('should add a new fertilizer to a concentrate', async () => {
      const concentrateId = 'someConcentrateId';
      const addFertilizerDto = {
        fertilizer: 'fertilizerId',
        concentration: 10,
      };
      const mockConcentrate = {
        fertilizers: [],
        save: jest.fn().mockResolvedValue({}),
      };

      concentrateModel.findById.mockResolvedValue(mockConcentrate);

      const result = await service.addFertilizer(
        concentrateId,
        addFertilizerDto,
      );
      expect(mockConcentrate.fertilizers).toContain(addFertilizerDto);
      expect(mockConcentrate.save).toHaveBeenCalled();
    });
  });

  describe('updateFertilizer', () => {
    it('should update a fertilizer in a concentrate', async () => {
      const concentrateId = 'someConcentrateId';
      const fertilizerId = 'fertilizerId';
      const updateFertilizerDto = { concentration: 20 };
      const mockFertilizer = { _id: fertilizerId, concentration: 10 };
      const mockConcentrate = {
        fertilizers: [mockFertilizer],
        save: jest.fn().mockResolvedValue({}),
      };

      concentrateModel.findById.mockResolvedValue(mockConcentrate);

      const result = await service.updateFertilizer(
        concentrateId,
        fertilizerId,
        updateFertilizerDto,
      );
      expect(mockFertilizer.concentration).toBe(
        updateFertilizerDto.concentration,
      );
      expect(mockConcentrate.save).toHaveBeenCalled();
    });

    it('should throw NotFoundException if fertilizer is not found', async () => {
      const concentrateId = 'someConcentrateId';
      const fertilizerId = 'nonExistentFertilizerId';
      const updateFertilizerDto = { concentration: 20 };
      const mockConcentrate = {
        fertilizers: [],
        save: jest.fn().mockResolvedValue({}),
      };

      concentrateModel.findById.mockResolvedValue(mockConcentrate);

      await expect(
        service.updateFertilizer(
          concentrateId,
          fertilizerId,
          updateFertilizerDto,
        ),
      ).rejects.toThrow(NotFoundException);
    });
  });

  describe('removeFertilizer', () => {
    it('should remove a fertilizer from a concentrate', async () => {
      const concentrateId = 'someConcentrateId';
      const fertilizerId = 'fertilizerId';
      const mockFertilizer = { fertilizer: fertilizerId };
      const mockConcentrate = {
        fertilizers: [mockFertilizer],
        save: jest.fn().mockResolvedValue({}),
      };

      concentrateModel.findById.mockResolvedValue(mockConcentrate);

      const result = await service.removeFertilizer(
        concentrateId,
        fertilizerId,
      );
      expect(mockConcentrate.fertilizers).not.toContain(mockFertilizer);
      expect(mockConcentrate.save).toHaveBeenCalled();
    });
  });

  describe('calculateComposition', () => {
    it('should calculate the composition of a concentrate', async () => {
      const mockFertilizer = {
        _id: 'fertilizerId',
        concentration: 10,
        content: [{ element: 'N', concentration: 5 }],
        kationes: 1,
        aniones: 1,
      };
      const mockConcentrate = {
        fertilizers: [{ fertilizer: 'fertilizerId', concentration: 10 }],
        save: jest.fn().mockResolvedValue({}),
      };

      fertilizerModel.findById.mockResolvedValue(mockFertilizer);
      concentrateModel.findById.mockResolvedValue(mockConcentrate);

      const result = await service.calculateComposition(
        mockConcentrate as ConcentrateDocument,
      );
      expect(mockConcentrate.kationes).toBe(10);
      expect(mockConcentrate.aniones).toBe(10);
      expect(mockConcentrate.content).toEqual([
        { element: 'N', concentration: 0.05 },
      ]);
      expect(mockConcentrate.save).toHaveBeenCalled();
    });
  });
});
