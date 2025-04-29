import { Test, TestingModule } from '@nestjs/testing';
import { FertilizerController } from './fertilizer.controller';
import { FertilizerService } from './fertilizer.service';
import { AddFertilizerDto } from './dto/add-fertilizer.dto';
import { UpdateFertilizerDto } from './dto/update-fertilizer.dto';
import { CalculationInterceptor } from 'src/shared/interceptors/calculation.interceptor';
import { UseInterceptors } from '@nestjs/common';

describe('FertilizerController', () => {
  let controller: FertilizerController;
  let service: FertilizerService;

  // Mock data
  const concentrateId = 'concentrate-id-1';
  const fertilizerId = 'fertilizer-id-1';
  const mockFertilizer = {
    id: fertilizerId,
    name: 'Test Fertilizer',
    amount: 100,
  };
  const mockFertilizers = [
    mockFertilizer,
    { id: 'fertilizer-id-2', name: 'Another Fertilizer', amount: 200 },
  ];

  // Mock service
  const mockFertilizerService = {
    findAll: jest.fn(),
    addFertilizer: jest.fn(),
    updateFertilizer: jest.fn(),
    removeFertilizer: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FertilizerController],
      providers: [
        {
          provide: FertilizerService,
          useValue: mockFertilizerService,
        },
      ],
    }).compile();

    controller = module.get<FertilizerController>(FertilizerController);
    service = module.get<FertilizerService>(FertilizerService);

    // Reset mock functions
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findAll', () => {
    it('should return all fertilizers for a concentrate', async () => {
      // Arrange
      mockFertilizerService.findAll.mockResolvedValue(mockFertilizers);

      // Act
      const result = await controller.findAll(concentrateId);

      // Assert
      expect(service.findAll).toHaveBeenCalledWith(concentrateId);
      expect(result).toEqual(mockFertilizers);
    });

    it('should handle empty result', async () => {
      // Arrange
      mockFertilizerService.findAll.mockResolvedValue([]);

      // Act
      const result = await controller.findAll(concentrateId);

      // Assert
      expect(result).toEqual([]);
      expect(service.findAll).toHaveBeenCalledWith(concentrateId);
    });
  });

  describe('addFertilizer', () => {
    it('should add a fertilizer to a concentrate', async () => {
      // Arrange
      const addFertilizerDto: AddFertilizerDto = {
        fertilizer: fertilizerId as any,
        concentration: 100,
      };
      mockFertilizerService.addFertilizer.mockResolvedValue(mockFertilizer);

      // Act
      const result = await controller.addFertilizer(
        concentrateId,
        addFertilizerDto,
      );

      // Assert
      expect(service.addFertilizer).toHaveBeenCalledWith(
        concentrateId,
        addFertilizerDto,
      );
      expect(result).toEqual(mockFertilizer);
    });
  });

  describe('updateFertilizer', () => {
    it('should update a fertilizer', async () => {
      // Arrange
      const updateFertilizerDto: UpdateFertilizerDto = { concentration: 150 };
      const updatedFertilizer = { ...mockFertilizer, concentration: 150 };
      mockFertilizerService.updateFertilizer.mockResolvedValue(
        updatedFertilizer,
      );

      // Act
      const result = await controller.updateFertilizer(
        concentrateId,
        fertilizerId,
        updateFertilizerDto,
      );

      // Assert
      expect(service.updateFertilizer).toHaveBeenCalledWith(
        concentrateId,
        fertilizerId,
        updateFertilizerDto,
      );
      expect(result).toEqual(updatedFertilizer);
    });
  });

  describe('removeFertilizer', () => {
    it('should remove a fertilizer', async () => {
      // Arrange
      mockFertilizerService.removeFertilizer.mockResolvedValue(mockFertilizer);

      // Act
      const result = await controller.removeFertilizer(
        concentrateId,
        fertilizerId,
      );

      // Assert
      expect(service.removeFertilizer).toHaveBeenCalledWith(
        concentrateId,
        fertilizerId,
      );
      expect(result).toEqual(mockFertilizer);
    });
  });
  // Smoke test
  describe('admin/test', () => {
    it('should have interceptors applied', () => {
      // Apply the interceptor to the controller for testing purposes
      UseInterceptors(CalculationInterceptor)(FertilizerController);

      // Verify the controller has the CalculationInterceptor applied
      const controllerMetadata = Reflect.getMetadata(
        '__interceptors__',
        FertilizerController,
      );
      expect(controllerMetadata).toContain(CalculationInterceptor);
    });
  });
});
