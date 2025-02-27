import { Test, TestingModule } from '@nestjs/testing';
import { FertilizerUnitController } from './fertilizer-unit.controller';
import { FertilizerUnitService } from './fertilizer-unit.service';
import { UpdateFertilizerUnitDto } from './dto/update-fertilizer-unit.dto';
import { CreateFertilizerUnitDto } from './dto/create-fertilizer-unit.dto';
import { FertilizerUnit } from 'src/schemas/fertilizer-unit.schema';

describe('FertilizerUnitController', () => {
  let controller: FertilizerUnitController;
  let service: FertilizerUnitService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FertilizerUnitController],
      providers: [
        {
          provide: FertilizerUnitService,
          useValue: {
            createFertilizerUnit: jest.fn(),
            findAll: jest.fn(),
            findOne: jest.fn(),
            updateFertilizerUnit: jest.fn(),
            deleteFertilizerUnit: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<FertilizerUnitController>(FertilizerUnitController);
    service = module.get<FertilizerUnitService>(FertilizerUnitService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('createFertilizerUnit', () => {
    it('should create a new fertilizer unit', async () => {
      const createDto: CreateFertilizerUnitDto = {
        name: 'New Fertilizer Unit',
        description: 'Test Description',
      };
      const result: FertilizerUnit = {
        name: 'New Fertilizer Unit',
        description: 'Test Description',
        water: null,
        recipe: null,
        pumps: [],
        solution: {
          elements: [],
          iones: { aniones: [], kationes: [] },
          kationes: 0,
          aniones: 0,
          EC: 0,
        },
      };
      jest.spyOn(service, 'createFertilizerUnit').mockResolvedValue(result);

      expect(await controller.createFertilizerUnit(createDto)).toBe(result);
      expect(service.createFertilizerUnit).toHaveBeenCalledWith(createDto);
    });
  });

  describe('findAll', () => {
    it('should return an array of fertilizer units', async () => {
      const result: FertilizerUnit[] = [
        {
          name: 'New Fertilizer Unit',
          description: 'Test Description',
          water: null,
          recipe: null,
          pumps: [],
          solution: {
            elements: [],
            iones: { aniones: [], kationes: [] },
            kationes: 0,
            aniones: 0,
            EC: 0,
          },
        },
      ];
      jest.spyOn(service, 'findAll').mockResolvedValue(result);

      expect(await controller.findAll()).toBe(result);
      expect(service.findAll).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return a single fertilizer unit', async () => {
      const result = {
        name: 'New Fertilizer Unit',
        description: 'Test Description',
        water: null,
        recipe: null,
        pumps: [],
        solution: {
          elements: [],
          iones: { aniones: [], kationes: [] },
          kationes: 0,
          aniones: 0,
          EC: 0,
        },
      };
      jest.spyOn(service, 'findOne').mockResolvedValue(result);

      expect(await controller.findOne('1')).toBe(result);
      expect(service.findOne).toHaveBeenCalledWith('1');
    });
  });

  describe('updateFertilizerUnit', () => {
    it('should update a fertilizer unit', async () => {
      const updateDto: UpdateFertilizerUnitDto = {
        name: 'New Fertilizer Name',
      };
      const result = {
        name: 'New Fertilizer Unit',
        description: 'Test Description',
        water: null,
        recipe: null,
        pumps: [],
        solution: {
          elements: [],
          iones: { aniones: [], kationes: [] },
          kationes: 0,
          aniones: 0,
          EC: 0,
        },
        ...updateDto,
      };
      jest.spyOn(service, 'updateFertilizerUnit').mockResolvedValue(result);

      expect(await controller.updateFertilizerUnit('1', updateDto)).toBe(
        result,
      );
      expect(service.updateFertilizerUnit).toHaveBeenCalledWith('1', updateDto);
    });
  });

  describe('deleteFertilizerUnit', () => {
    it('should delete a fertilizer unit', async () => {
      const result = {
        name: 'New Fertilizer Unit',
        description: 'Test Description',
        water: null,
        recipe: null,
        pumps: [],
        solution: {
          elements: [],
          iones: { aniones: [], kationes: [] },
          kationes: 0,
          aniones: 0,
          EC: 0,
        },
      };
      jest.spyOn(service, 'deleteFertilizerUnit').mockResolvedValue(result);

      expect(await controller.deleteFertilizerUnit('1')).toBe(result);
      expect(service.deleteFertilizerUnit).toHaveBeenCalledWith('1');
    });
  });
});
