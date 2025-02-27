import { Test, TestingModule } from '@nestjs/testing';
import { PumpController } from './pump.controller';
import { PumpService } from './pump.service';
import { CreatePumpDto } from './dto/create-pump.dto';
import { UpdatePumpDto } from './dto/update-pump.dto';
import { Mongoose, Types } from 'mongoose';

describe('PumpController', () => {
  let pumpController: PumpController;
  let pumpService: PumpService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PumpController],
      providers: [
        {
          provide: PumpService,
          useValue: {
            create: jest.fn(),
            findOne: jest.fn(),
            update: jest.fn(),
            delete: jest.fn(),
          },
        },
      ],
    }).compile();

    pumpController = module.get<PumpController>(PumpController);
    pumpService = module.get<PumpService>(PumpService);
  });

  it('should be defined', () => {
    expect(pumpController).toBeDefined();
  });

  describe('createPump', () => {
    it('should create a new pump', async () => {
      const createPumpDto: CreatePumpDto = {
        name: 'Test Pump',
        description: 'Testing Pump Instance',
        minFlowRate: 0.4,
        maxFlowRate: 4.0,
        concentrate: new Types.ObjectId(),
        flowRate: 0.4,
        factor: 1,
      };
      const result = {
        _id: new Types.ObjectId(),
        ...createPumpDto,
      };
      jest.spyOn(pumpService, 'create').mockResolvedValue(result);

      expect(await pumpController.createPump('1', createPumpDto)).toBe(result);
      expect(pumpService.create).toHaveBeenCalledWith('1', createPumpDto);
    });
  });

  describe('findOne', () => {
    it('should return a single pump', async () => {
      const result = {
        /* fill with expected result */
      };
      jest.spyOn(pumpService, 'findOne').mockResolvedValue(result);

      expect(await pumpController.findOne('1', '1')).toBe(result);
      expect(pumpService.findOne).toHaveBeenCalledWith('1', '1');
    });
  });

  describe('updatePump', () => {
    it('should update a pump', async () => {
      const updatePumpDto: UpdatePumpDto = {
        /* fill with appropriate test data */
      };
      const result = {
        /* fill with expected result */
      };
      jest.spyOn(pumpService, 'update').mockResolvedValue(result);

      expect(await pumpController.updatePump('1', '1', updatePumpDto)).toBe(
        result,
      );
      expect(pumpService.update).toHaveBeenCalledWith('1', '1', updatePumpDto);
    });
  });

  describe('deletePump', () => {
    it('should delete a pump', async () => {
      const result = {
        /* fill with expected result */
      };
      jest.spyOn(pumpService, 'delete').mockResolvedValue(result);

      expect(await pumpController.deletePump('1', '1')).toBe(result);
      expect(pumpService.delete).toHaveBeenCalledWith('1', '1');
    });
  });
});
