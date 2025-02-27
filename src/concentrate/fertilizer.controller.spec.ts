import { Test, TestingModule } from '@nestjs/testing';
import { FertilizerController } from './fertilizer.controller';
import { FertilizerService } from './fertilizer.service';
import { AddFertilizerDto } from './dto/add-fertilizer.dto';
import { UpdateFertilizerDto } from './dto/update-fertilizer.dto';

describe('FertilizerController', () => {
  let controller: FertilizerController;
  let service: FertilizerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FertilizerController],
      providers: [
        {
          provide: FertilizerService,
          useValue: {
            findAll: jest.fn(),
            addFertilizer: jest.fn(),
            updateFertilizer: jest.fn(),
            removeFertilizer: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<FertilizerController>(FertilizerController);
    service = module.get<FertilizerService>(FertilizerService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of fertilizers', async () => {
      const result = [{ id: '1', name: 'Test Fertilizer' }];
      jest.spyOn(service, 'findAll').mockResolvedValue(result);

      expect(await controller.findAll('1')).toBe(result);
    });
  });

  describe('addFertilizer', () => {
    it('should add a new fertilizer', async () => {
      const addFertilizerDto: AddFertilizerDto = { name: 'New Fertilizer' };
      const result = { id: '1', ...addFertilizerDto };
      jest.spyOn(service, 'addFertilizer').mockResolvedValue(result);

      expect(await controller.addFertilizer('1', addFertilizerDto)).toBe(
        result,
      );
    });
  });

  describe('updateFertilizer', () => {
    it('should update a fertilizer', async () => {
      const updateFertilizerDto: UpdateFertilizerDto = {
        name: 'Updated Fertilizer',
      };
      const result = { id: '1', ...updateFertilizerDto };
      jest.spyOn(service, 'updateFertilizer').mockResolvedValue(result);

      expect(
        await controller.updateFertilizer('1', '1', updateFertilizerDto),
      ).toBe(result);
    });
  });

  describe('removeFertilizer', () => {
    it('should remove a fertilizer', async () => {
      const result = { id: '1', name: 'Removed Fertilizer' };
      jest.spyOn(service, 'removeFertilizer').mockResolvedValue(result);

      expect(await controller.removeFertilizer('1', '1')).toBe(result);
    });
  });
});
