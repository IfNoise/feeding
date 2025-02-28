import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { FertilizerUnitService } from './fertilizer-unit.service';
import { FertilizerUnit } from '../schemas/fertilizer-unit.schema';
import { Model } from 'mongoose';

const mockFertilizerUnit = {
  _id: 'someId',
  name: 'Test Fertilizer Unit',
  // Add other properties as needed
};

const mockFertilizerUnitModel = {
  new: jest.fn().mockImplementation(() => mockFertilizerUnit),
  constructor: jest.fn().mockImplementation(() => mockFertilizerUnit),
  create: jest.fn().mockImplementation((dto) => {
    return Promise.resolve({ ...mockFertilizerUnit, ...dto });
  }),
  find: jest.fn().mockImplementation(() => ({
    exec: jest.fn().mockResolvedValue([mockFertilizerUnit]),
  })),
  findOne: jest.fn().mockImplementation(() => ({
    exec: jest.fn().mockResolvedValue(mockFertilizerUnit),
  })),
  findOne: jest.fn().mockImplementation(() => ({
    exec: jest.fn().mockResolvedValue(mockFertilizerUnit),
  })),
  findByIdAndUpdate: jest.fn().mockImplementation(() => ({
    exec: jest.fn().mockResolvedValue(mockFertilizerUnit),
  })),
  findByIdAndDelete: jest.fn().mockImplementation(() => ({
    exec: jest.fn().mockResolvedValue(mockFertilizerUnit),
  })),
};

describe('FertilizerUnitService', () => {
  let service: FertilizerUnitService;
  let model: Model<FertilizerUnit>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FertilizerUnitService,
        {
          provide: getModelToken(FertilizerUnit.name),
          useValue: mockFertilizerUnitModel,
        },
      ],
    }).compile();

    service = module.get<FertilizerUnitService>(FertilizerUnitService);
    model = module.get<Model<FertilizerUnit>>(
      getModelToken(FertilizerUnit.name),
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a new fertilizer unit', async () => {
    const createFertilizerUnitDto = { name: 'New Fertilizer Unit' };
    const result = await service.createFertilizerUnit(createFertilizerUnitDto);
    expect(result).toEqual(mockFertilizerUnit);
  });

  it('should find all fertilizer units', async () => {
    const result = await service.findAll();
    expect(result).toEqual([mockFertilizerUnit]);
  });

  it('should find a fertilizer unit by id', async () => {
    const result = await service.findOne('someId');
    expect(result).toEqual(mockFertilizerUnit);
  });

  it('should update a fertilizer unit', async () => {
    const updateFertilizerUnitDto = { name: 'Updated Fertilizer Unit' };
    const result = await service.updateFertilizerUnit(
      'someId',
      updateFertilizerUnitDto,
    );
    expect(result).toEqual(mockFertilizerUnit);
  });

  it('should delete a fertilizer unit', async () => {
    const result = await service.deleteFertilizerUnit('someId');
    expect(result).toEqual(mockFertilizerUnit);
  });

  it('should create a new instance of FertilizerUnitService', () => {
    expect(service instanceof FertilizerUnitService).toBeTruthy();
  });

  it('should have the model defined', () => {
    expect(model).toBeDefined();
  });

  it('should validate mock model methods exist', () => {
    expect(mockFertilizerUnitModel.find).toBeDefined();
    expect(mockFertilizerUnitModel.findById).toBeDefined();
    expect(mockFertilizerUnitModel.findByIdAndUpdate).toBeDefined();
    expect(mockFertilizerUnitModel.findByIdAndDelete).toBeDefined();
  });

  it('should handle errors when creating fertilizer unit', async () => {
    jest.spyOn(model, 'create').mockRejectedValueOnce(new Error('Test error'));
    await expect(service.createFertilizerUnit({})).rejects.toThrow(
      'Test error',
    );
  });

  it('should handle errors when finding fertilizer units', async () => {
    jest.spyOn(model, 'find').mockRejectedValueOnce(new Error('Test error'));
    await expect(service.findAll()).rejects.toThrow('Test error');
  });
});
