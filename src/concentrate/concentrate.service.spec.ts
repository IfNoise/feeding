import { Test, TestingModule } from '@nestjs/testing';
import { ConcentrateService } from './concentrate.service';
import { getModelToken } from '@nestjs/mongoose';
import {
  Concentrate,
  ConcentrateDocument,
} from '../schemas/concentrate.schema';
import { Fertilizer } from '../schemas/fertilizer.schema';
import { CreateConcentrateDto } from './dto/create-concentrate.dto';
import { UpdateConcentrateDto } from './dto/update-concentrate.dto';
import { Model, Query } from 'mongoose';

/**
 * Tests for the ConcentrateService class
 */
describe('ConcentrateService', () => {
  let service: ConcentrateService;
  let concentrateModel: Model<ConcentrateDocument>;

  // Create a mock with the expected Mongoose document structure
  const mockConcentrate: Partial<ConcentrateDocument> = {
    _id: 'someId',
    name: 'Test Concentrate',
    description: 'Test Description',
    fertilizers: [],
    content: [],
    aniones: 0,
    kationes: 0,
    solution: {},
  };

  // Type for mocked query
  type MockQuery<T = any> = Partial<Query<T, T>> & {
    exec: jest.Mock;
  };

  beforeEach(async () => {
    // Create mock query for find operation
    const mockFindQuery: MockQuery = {
      exec: jest.fn().mockResolvedValue([mockConcentrate]),
    };

    // Create mock query for findById operation
    const mockFindByIdQuery: MockQuery = {
      exec: jest.fn().mockResolvedValue(mockConcentrate),
    };

    // Initialize model mocks with correct typing and constructor functionality
    const mockConcentrateModel = {
      // Add constructor functionality
      new: jest.fn().mockResolvedValue(mockConcentrate),
      constructor() {
        jest.fn().mockReturnValue(mockConcentrate);
      },
      // Standard model methods
      find: jest.fn().mockReturnValue(mockFindQuery),
      findById: jest.fn().mockReturnValue(mockFindByIdQuery),
      findByIdAndUpdate: jest.fn().mockResolvedValue(mockConcentrate),
      findByIdAndDelete: jest.fn().mockResolvedValue(mockConcentrate),
      create: jest.fn().mockResolvedValue(mockConcentrate),
      // Make the mock function as a constructor
      prototype: {
        save: jest.fn().mockResolvedValue(mockConcentrate),
      },
    };
    // Add special constructor behavior
    Object.defineProperty(mockConcentrateModel, Symbol.hasInstance, {
      value: () => true,
    });

    const mockFertilizerModel = {
      find: jest.fn().mockResolvedValue([]),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ConcentrateService,
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

    service = module.get<ConcentrateService>(ConcentrateService);
    concentrateModel = module.get<Model<ConcentrateDocument>>(
      getModelToken(Concentrate.name),
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a new concentrate', async () => {
      // Arrange
      const createConcentrateDto: CreateConcentrateDto = {
        name: 'Test Concentrate',
        description: 'Test Description',
      };

      // Act
      const result = await service.create(createConcentrateDto);

      // Assert
      expect(result).toEqual(mockConcentrate);
    });
  });

  describe('findAll', () => {
    it('should return all concentrates', async () => {
      // Act
      const result = await service.findAll();

      // Assert
      expect(result).toEqual([mockConcentrate]);
      expect(concentrateModel.find).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return a concentrate by id', async () => {
      // Arrange
      const id = 'someId';

      // Act
      const result = await service.findOne(id);

      // Assert
      expect(result).toEqual(mockConcentrate);
      expect(concentrateModel.findById).toHaveBeenCalledWith(id);
    });
  });

  describe('update', () => {
    it('should update a concentrate', async () => {
      // Arrange
      const id = 'someId';
      const updateConcentrateDto: UpdateConcentrateDto = {
        name: 'Updated Concentrate',
        description: 'Updated Description',
      };

      // Act
      const result = await service.update(id, updateConcentrateDto);

      // Assert
      expect(result).toEqual(mockConcentrate);
      expect(concentrateModel.findByIdAndUpdate).toHaveBeenCalledWith(
        id,
        updateConcentrateDto,
        { new: true },
      );
    });
  });

  describe('remove', () => {
    it('should delete a concentrate', async () => {
      // Arrange
      const id = 'someId';

      // Act
      const result = await service.remove(id);

      // Assert
      expect(result).toEqual(mockConcentrate);
      expect(concentrateModel.findByIdAndDelete).toHaveBeenCalledWith(id);
    });
  });
});
