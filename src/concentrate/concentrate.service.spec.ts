import { Test, TestingModule } from '@nestjs/testing';
import { ConcentrateService } from './concentrate.service';
import { getModelToken } from '@nestjs/mongoose';
import { Concentrate } from 'src/schemas/concentrate.schema';
import { Model } from 'mongoose';
import { CreateConcentrateDto } from './dto/create-concentrate.dto';
import { UpdateConcentrateDto } from './dto/update-concentrate.dto';

describe('ConcentrateService', () => {
  let service: ConcentrateService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ConcentrateService],
    }).compile();

    service = module.get<ConcentrateService>(ConcentrateService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('ConcentrateService', () => {
    let service: ConcentrateService;
    let model: Model<Concentrate>;

    const mockConcentrate = {
      _id: 'someId',
      name: 'Test Concentrate',
      description: 'Test Description',
    };

    const mockConcentrateModel = {
      new: jest.fn().mockResolvedValue(mockConcentrate),
      constructor: jest.fn().mockResolvedValue(mockConcentrate),
      find: jest.fn().mockResolvedValue([mockConcentrate]),
      findById: jest.fn().mockResolvedValue(mockConcentrate),
      findByIdAndUpdate: jest.fn().mockResolvedValue(mockConcentrate),
      findByIdAndDelete: jest.fn().mockResolvedValue(mockConcentrate),
      save: jest.fn().mockResolvedValue(mockConcentrate),
    };

    beforeEach(async () => {
      const module: TestingModule = await Test.createTestingModule({
        providers: [
          ConcentrateService,
          {
            provide: getModelToken(Concentrate.name),
            useValue: mockConcentrateModel,
          },
        ],
      }).compile();

      service = module.get<ConcentrateService>(ConcentrateService);
      model = module.get<Model<Concentrate>>(getModelToken(Concentrate.name));
    });

    it('should be defined', () => {
      expect(service).toBeDefined();
    });

    it('should create a new concentrate', async () => {
      const createConcentrateDto: CreateConcentrateDto = {
        name: 'Test Concentrate',
        description: 'Test Description',
      };
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
});
