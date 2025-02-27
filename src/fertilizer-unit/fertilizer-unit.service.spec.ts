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
  new: jest.fn().mockResolvedValue(mockFertilizerUnit),
  constructor: jest.fn().mockResolvedValue(mockFertilizerUnit),
  create: jest.fn().mockResolvedValue(mockFertilizerUnit),
  find: jest.fn().mockReturnValue({
    exec: jest.fn().mockResolvedValue([mockFertilizerUnit]),
  }),
  findById: jest.fn().mockReturnValue({
    exec: jest.fn().mockResolvedValue(mockFertilizerUnit),
  }),
  findByIdAndUpdate: jest.fn().mockReturnValue({
    exec: jest.fn().mockResolvedValue(mockFertilizerUnit),
  }),
  findByIdAndDelete: jest.fn().mockReturnValue({
    exec: jest.fn().mockResolvedValue(mockFertilizerUnit),
  }),
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
});
