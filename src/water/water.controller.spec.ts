import { Test, TestingModule } from '@nestjs/testing';
import { WaterController } from './water.controller';
import { WaterService } from './water.service';
import { UpdateWaterDto } from './dto/update-water.dto';
import { IdParamDto } from '../shared/dto/idparam.dto';
import { UpdateElementDto } from './dto/update-element.dto';

describe('WaterController', () => {
  let controller: WaterController;
  let service: WaterService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WaterController],
      providers: [
        {
          provide: WaterService,
          useValue: {
            createWater: jest.fn(),
            findAll: jest.fn(),
            findOne: jest.fn(),
            updateWater: jest.fn(),
            deleteWater: jest.fn(),
            addElement: jest.fn(),
            updateElement: jest.fn(),
            removeElement: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<WaterController>(WaterController);
    service = module.get<WaterService>(WaterService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('createWater', () => {
    it('should create a new water', async () => {
      const createWaterDto = { name: 'Test Water' };
      const result = { id: '1', ...createWaterDto };
      jest.spyOn(service, 'createWater').mockResolvedValue(result);

      expect(await controller.createWater(createWaterDto)).toBe(result);
    });
  });

  describe('findAll', () => {
    it('should return an array of water', async () => {
      const result = [{ id: '1', name: 'Test Water' }];
      jest.spyOn(service, 'findAll').mockResolvedValue(result);

      expect(await controller.findAll()).toBe(result);
    });
  });

  describe('findOne', () => {
    it('should return a single water by ID', async () => {
      const result = { id: '1', name: 'Test Water' };
      jest.spyOn(service, 'findOne').mockResolvedValue(result);

      expect(await controller.findOne({ id: '1' } as IdParamDto)).toBe(result);
    });
  });

  describe('updateWater', () => {
    it('should update a water', async () => {
      const updateWaterDto: UpdateWaterDto = { name: 'Updated Water' };
      const result = { id: '1', ...updateWaterDto };
      jest.spyOn(service, 'updateWater').mockResolvedValue(result);

      expect(
        await controller.updateWater({ id: '1' } as IdParamDto, updateWaterDto),
      ).toBe(result);
    });
  });

  describe('deleteWater', () => {
    it('should delete a water', async () => {
      const result = { id: '1', name: 'Test Water' };
      jest.spyOn(service, 'deleteWater').mockResolvedValue(result);

      expect(await controller.deleteWater({ id: '1' } as IdParamDto)).toBe(
        result,
      );
    });
  });

  describe('addElement', () => {
    it('should add an element to a water', async () => {
      const element = { name: 'Test Element' };
      const result = { id: '1', elements: [element] };
      jest.spyOn(service, 'addElement').mockResolvedValue(result);

      expect(await controller.addElement('1', element)).toBe(result);
    });
  });

  describe('updateElement', () => {
    it('should update an element in a water', async () => {
      const updateElementDto: UpdateElementDto = { name: 'Updated Element' };
      const result = { id: '1', elements: [{ id: '1', ...updateElementDto }] };
      jest.spyOn(service, 'updateElement').mockResolvedValue(result);

      expect(await controller.updateElement('1', '1', updateElementDto)).toBe(
        result,
      );
    });
  });

  describe('removeElement', () => {
    it('should remove an element from a water', async () => {
      const result = { id: '1', elements: [] };
      jest.spyOn(service, 'removeElement').mockResolvedValue(result);

      expect(await controller.removeElement('1', '1')).toBe(result);
    });
  });
});
