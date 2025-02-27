import { Test, TestingModule } from '@nestjs/testing';
import { FertilizerService } from './fertilizer.service';
import { getModelToken } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Fertilizer } from '../schemas/fertilizer.schema';
import { NotFoundException } from '@nestjs/common';
import { FertilizerType } from './dto/create-fertilizer.dto';

const mockFertilizer = {
  _id: 'someId',
  name: 'Test Fertilizer',
  type: 'solid',
  elements: [
    {
      name: 'Nitrogen',
      form: 'NO3',
      concentration: 10,
    },
  ],
};

const mockFertilizerModel = {
  create: jest.fn().mockResolvedValue(mockFertilizer),
  find: jest.fn().mockResolvedValue([mockFertilizer]),
  findById: jest.fn().mockResolvedValue(mockFertilizer),
  findByIdAndUpdate: jest.fn().mockResolvedValue(mockFertilizer),
  findByIdAndDelete: jest.fn().mockResolvedValue(mockFertilizer),
};

describe('FertilizerService', () => {
  let service: FertilizerService;
  let model: Model<Fertilizer>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FertilizerService,
        {
          provide: getModelToken(Fertilizer.name),
          useValue: mockFertilizerModel,
        },
      ],
    }).compile();

    service = module.get<FertilizerService>(FertilizerService);
    model = module.get<Model<Fertilizer>>(getModelToken(Fertilizer.name));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a new fertilizer', async () => {
    const createFertilizerDto = {
      name: 'Test Fertilizer',
      description: 'Test Fertilizer',
      type: FertilizerType.SOLID, // Ensure this matches the enum
      elements: [
        {
          name: 'Nitrogen',
          form: 'NO3',
          concentration: 10,
        },
      ],
    };
    const result = await service.createFertilizer(createFertilizerDto);
    expect(result).toEqual(mockFertilizer);
    expect(model.create).toHaveBeenCalledWith(createFertilizerDto);
  });

  it('should return all fertilizers', async () => {
    const result = await service.findAll();
    expect(result).toEqual([mockFertilizer]);
    expect(model.find).toHaveBeenCalled();
  });

  it('should return a fertilizer by ID', async () => {
    const result = await service.findOne('someId');
    expect(result).toEqual(mockFertilizer);
    expect(model.findById).toHaveBeenCalledWith('someId');
  });

  it('should throw NotFoundException if fertilizer not found by ID', async () => {
    jest.spyOn(model, 'findById').mockResolvedValueOnce(null);
    await expect(service.findOne('someId')).rejects.toThrow(NotFoundException);
  });

  it('should update a fertilizer', async () => {
    const updateFertilizerDto = { name: 'Updated Fertilizer' };
    const result = await service.updateFertilizer(
      'someId',
      updateFertilizerDto,
    );
    expect(result).toEqual(mockFertilizer);
    expect(model.findByIdAndUpdate).toHaveBeenCalledWith(
      'someId',
      updateFertilizerDto,
      { new: true },
    );
  });

  it('should throw NotFoundException if fertilizer not found for update', async () => {
    jest.spyOn(model, 'findByIdAndUpdate').mockResolvedValueOnce(null);
    await expect(
      service.updateFertilizer('someId', { name: 'Updated Fertilizer' }),
    ).rejects.toThrow(NotFoundException);
  });

  it('should delete a fertilizer', async () => {
    const result = await service.deleteFertilizer('someId');
    expect(result).toEqual(mockFertilizer);
    expect(model.findByIdAndDelete).toHaveBeenCalledWith('someId');
  });

  it('should throw NotFoundException if fertilizer not found for deletion', async () => {
    jest.spyOn(model, 'findByIdAndDelete').mockResolvedValueOnce(null);
    await expect(service.deleteFertilizer('someId')).rejects.toThrow(
      NotFoundException,
    );
  });
});
