import { Test, TestingModule } from '@nestjs/testing';
import { ConcentrateService } from './concentrate.service';
import { getModelToken } from '@nestjs/mongoose';
import { Concentrate } from '../schemas/concentrate.schema';
import { Fertilizer } from '../schemas/fertilizer.schema';
import { Model } from 'mongoose';
import { CreateConcentrateDto } from './dto/create-concentrate.dto';
import { UpdateConcentrateDto } from './dto/update-concentrate.dto';

describe('ConcentrateService', () => {
  let service: ConcentrateService;
  let model: Model<Concentrate>;

  const mockConcentrate = {
    _id: 'someId',
    name: 'Test Concentrate',
    description: 'Test Description',
  };
  const mockConcentrateModel = {
    constructor: jest.fn().mockResolvedValue(mockConcentrate),
    find: jest.fn().mockReturnThis(),
    exec: jest.fn().mockResolvedValue([mockConcentrate]),
    findById: jest.fn().mockImplementation(() => {
      return {
        exec: jest.fn().mockResolvedValue(mockConcentrate),
      };
    }),
    findByIdAndUpdate: jest.fn().mockResolvedValue(mockConcentrate),
    findByIdAndDelete: jest.fn().mockResolvedValue(mockConcentrate),
    create: jest.fn().mockResolvedValue(mockConcentrate),
    prototype: {
      save: jest.fn().mockResolvedValue(mockConcentrate),
    },
  };

  const mockFertilizerModel = {
    find: jest.fn().mockResolvedValue([]),
  };

  beforeEach(async () => {
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
    it('should create a new concentrate', async () => {
      const createConcentrateDto: CreateConcentrateDto = {
        name: 'Test Concentrate',
        description: 'Test Description',
        fertilizers: [
          { fertilizer: '60f790f3b311f83d1f4f3f3d', concentration: 100 },
        ],
      };
      const result = await service.create(createConcentrateDto);
      expect(result).toEqual(mockConcentrate);
      expect(mockConcentrateModel.create).toHaveBeenCalled();
    });
    const result = await service.create(createConcentrateDto);
    expect(result).toEqual(mockConcentrate);
    expect(mockConcentrateModel.save).toHaveBeenCalled();
  });

  it('should return all concentrates', async () => {
    const result = await service.findAll();
    expect(result).toEqual([mockConcentrate]);
    expect(mockConcentrateModel.find).toHaveBeenCalled();
  });

  it('should return a single concentrate by id', async () => {
    const result = await service.findOne('someId');
    expect(result).toEqual(mockConcentrate);
    expect(mockConcentrateModel.findById).toHaveBeenCalledWith('someId');
  });

  it('should update a concentrate', async () => {
    const updateConcentrateDto: UpdateConcentrateDto = {
      name: 'Updated Concentrate',
      description: 'Updated Description',
    };
    const result = await service.update('someId', updateConcentrateDto);
    expect(result).toEqual(mockConcentrate);
    expect(mockConcentrateModel.findByIdAndUpdate).toHaveBeenCalledWith(
      'someId',
      updateConcentrateDto,
      { new: true },
    );
  });

  it('should delete a concentrate', async () => {
    const result = await service.remove('someId');
    expect(result).toEqual(mockConcentrate);
    expect(mockConcentrateModel.findByIdAndDelete).toHaveBeenCalledWith(
      'someId',
    );
  });
});
