import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { NotFoundException, BadRequestException } from '@nestjs/common';
import { PumpService } from './pump.service';
import { FertilizerUnit, Pump } from '../schemas/fertilizer-unit.schema';
import { Concentrate } from '../schemas/concentrate.schema';
import { Model } from 'mongoose';

describe('PumpService', () => {
  let service: PumpService;
  let pumpModel: Model<Pump>;
  let concentrateModel: Model<Concentrate>;
  let fertilizerUnitModel: Model<FertilizerUnit>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PumpService,
        {
          provide: getModelToken(Pump.name),
          useValue: {
            create: jest.fn(),
            findById: jest.fn(),
          },
        },
        {
          provide: getModelToken(Concentrate.name),
          useValue: {
            findById: jest.fn(),
          },
        },
        {
          provide: getModelToken(FertilizerUnit.name),
          useValue: {
            findById: jest.fn(),
            save: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<PumpService>(PumpService);
    pumpModel = module.get<Model<Pump>>(getModelToken(Pump.name));
    concentrateModel = module.get<Model<Concentrate>>(
      getModelToken(Concentrate.name),
    );
    fertilizerUnitModel = module.get<Model<FertilizerUnit>>(
      getModelToken(FertilizerUnit.name),
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a new pump and associate it with a fertilizer unit', async () => {
      const fertilizerUnitId = 'someId';
      const createPumpDto = { name: 'Pump1' };
      const fertilizerUnit = {
        _id: fertilizerUnitId,
        pumps: [],
        save: jest.fn(),
      };
      const newPump = { _id: 'pumpId', ...createPumpDto };

      jest
        .spyOn(fertilizerUnitModel, 'findById')
        .mockResolvedValue(fertilizerUnit as any);
      jest.spyOn(pumpModel, 'create').mockResolvedValue(newPump as any);

      const result = await service.create(fertilizerUnitId, createPumpDto);

      expect(fertilizerUnitModel.findById).toHaveBeenCalledWith(
        fertilizerUnitId,
      );
      expect(pumpModel.create).toHaveBeenCalledWith(createPumpDto);
      expect(fertilizerUnit.pumps).toContain(newPump);
      expect(fertilizerUnit.save).toHaveBeenCalled();
      expect(result).toEqual(newPump);
    });

    it('should throw NotFoundException if fertilizer unit is not found', async () => {
      const fertilizerUnitId = 'someId';
      const createPumpDto = { name: 'Pump1' };

      jest.spyOn(fertilizerUnitModel, 'findById').mockResolvedValue(null);

      await expect(
        service.create(fertilizerUnitId, createPumpDto),
      ).rejects.toThrow(NotFoundException);
    });

    it('should throw BadRequestException if there is an error during creation', async () => {
      const fertilizerUnitId = 'someId';
      const createPumpDto = { name: 'Pump1' };
      const fertilizerUnit = {
        _id: fertilizerUnitId,
        pumps: [],
        save: jest.fn(),
      };

      jest
        .spyOn(fertilizerUnitModel, 'findById')
        .mockResolvedValue(fertilizerUnit as any);
      jest
        .spyOn(pumpModel, 'create')
        .mockRejectedValue(new Error('Creation error'));

      await expect(
        service.create(fertilizerUnitId, createPumpDto),
      ).rejects.toThrow(BadRequestException);
    });
  });

  describe('findOne', () => {
    it('should find a specific pump within a fertilizer unit', async () => {
      const fertilizerUnitId = 'someId';
      const pumpId = 'pumpId';
      const pump = { _id: pumpId };
      const fertilizerUnit = { _id: fertilizerUnitId, pumps: [pump] };

      jest
        .spyOn(fertilizerUnitModel, 'findById')
        .mockResolvedValue(fertilizerUnit as any);

      const result = await service.findOne(fertilizerUnitId, pumpId);

      expect(fertilizerUnitModel.findById).toHaveBeenCalledWith(
        fertilizerUnitId,
      );
      expect(result).toEqual(pump);
    });

    it('should throw NotFoundException if fertilizer unit is not found', async () => {
      const fertilizerUnitId = 'someId';
      const pumpId = 'pumpId';

      jest.spyOn(fertilizerUnitModel, 'findById').mockResolvedValue(null);

      await expect(service.findOne(fertilizerUnitId, pumpId)).rejects.toThrow(
        NotFoundException,
      );
    });

    it('should throw NotFoundException if pump is not found', async () => {
      const fertilizerUnitId = 'someId';
      const pumpId = 'pumpId';
      const fertilizerUnit = { _id: fertilizerUnitId, pumps: [] };

      jest
        .spyOn(fertilizerUnitModel, 'findById')
        .mockResolvedValue(fertilizerUnit as any);

      await expect(service.findOne(fertilizerUnitId, pumpId)).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('findAll', () => {
    it('should find all pumps within a fertilizer unit', async () => {
      const fertilizerUnitId = 'someId';
      const pumps = [{ _id: 'pump1' }, { _id: 'pump2' }];
      const fertilizerUnit = { _id: fertilizerUnitId, pumps };

      jest
        .spyOn(fertilizerUnitModel, 'findById')
        .mockResolvedValue(fertilizerUnit as any);

      const result = await service.findAll(fertilizerUnitId);

      expect(fertilizerUnitModel.findById).toHaveBeenCalledWith(
        fertilizerUnitId,
      );
      expect(result).toEqual(pumps);
    });

    it('should throw NotFoundException if fertilizer unit is not found', async () => {
      const fertilizerUnitId = 'someId';

      jest.spyOn(fertilizerUnitModel, 'findById').mockResolvedValue(null);

      await expect(service.findAll(fertilizerUnitId)).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('update', () => {
    it('should update a specific pump within a fertilizer unit', async () => {
      const fertilizerUnitId = 'someId';
      const pumpId = 'pumpId';
      const updatePumpDto = { name: 'UpdatedPump' };
      const pump = { _id: pumpId, name: 'OldPump' };
      const fertilizerUnit = {
        _id: fertilizerUnitId,
        pumps: [pump],
        save: jest.fn(),
      };

      jest
        .spyOn(fertilizerUnitModel, 'findById')
        .mockResolvedValue(fertilizerUnit as any);
      jest
        .spyOn(service, 'calculateComposition')
        .mockResolvedValue(fertilizerUnit as any);

      const result = await service.update(
        fertilizerUnitId,
        pumpId,
        updatePumpDto,
      );

      expect(fertilizerUnitModel.findById).toHaveBeenCalledWith(
        fertilizerUnitId,
      );
      expect(pump.name).toEqual(updatePumpDto.name);
      expect(fertilizerUnit.save).toHaveBeenCalled();
      expect(service.calculateComposition).toHaveBeenCalledWith(fertilizerUnit);
      expect(result).toEqual(pump);
    });

    it('should throw NotFoundException if fertilizer unit is not found', async () => {
      const fertilizerUnitId = 'someId';
      const pumpId = 'pumpId';
      const updatePumpDto = { name: 'UpdatedPump' };

      jest.spyOn(fertilizerUnitModel, 'findById').mockResolvedValue(null);

      await expect(
        service.update(fertilizerUnitId, pumpId, updatePumpDto),
      ).rejects.toThrow(NotFoundException);
    });

    it('should throw NotFoundException if pump is not found', async () => {
      const fertilizerUnitId = 'someId';
      const pumpId = 'pumpId';
      const updatePumpDto = { name: 'UpdatedPump' };
      const fertilizerUnit = {
        _id: fertilizerUnitId,
        pumps: [],
        save: jest.fn(),
      };

      jest
        .spyOn(fertilizerUnitModel, 'findById')
        .mockResolvedValue(fertilizerUnit as any);

      await expect(
        service.update(fertilizerUnitId, pumpId, updatePumpDto),
      ).rejects.toThrow(NotFoundException);
    });
  });

  describe('delete', () => {
    it('should delete a specific pump from a fertilizer unit', async () => {
      const fertilizerUnitId = 'someId';
      const pumpId = 'pumpId';
      const pump = { _id: pumpId };
      const fertilizerUnit = {
        _id: fertilizerUnitId,
        pumps: [pump],
        save: jest.fn(),
      };

      jest
        .spyOn(fertilizerUnitModel, 'findById')
        .mockResolvedValue(fertilizerUnit as any);

      const result = await service.delete(fertilizerUnitId, pumpId);

      expect(fertilizerUnitModel.findById).toHaveBeenCalledWith(
        fertilizerUnitId,
      );
      expect(fertilizerUnit.pumps).not.toContain(pump);
      expect(fertilizerUnit.save).toHaveBeenCalled();
      expect(result).toEqual(pump);
    });

    it('should throw NotFoundException if fertilizer unit is not found', async () => {
      const fertilizerUnitId = 'someId';
      const pumpId = 'pumpId';

      jest.spyOn(fertilizerUnitModel, 'findById').mockResolvedValue(null);

      await expect(service.delete(fertilizerUnitId, pumpId)).rejects.toThrow(
        NotFoundException,
      );
    });

    it('should throw NotFoundException if pump is not found', async () => {
      const fertilizerUnitId = 'someId';
      const pumpId = 'pumpId';
      const fertilizerUnit = {
        _id: fertilizerUnitId,
        pumps: [],
        save: jest.fn(),
      };

      jest
        .spyOn(fertilizerUnitModel, 'findById')
        .mockResolvedValue(fertilizerUnit as any);

      await expect(service.delete(fertilizerUnitId, pumpId)).rejects.toThrow(
        NotFoundException,
      );
    });
  });
});
