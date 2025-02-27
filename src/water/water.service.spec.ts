import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { WaterService } from './water.service';
import { Water } from '../schemas/water.schema';
import { Element } from '../schemas/element.schema';

describe('WaterService', () => {
  let service: WaterService;
  let waterModel: any;
  let elementModel: any;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        WaterService,
        {
          provide: getModelToken(Water.name),
          useValue: {
            new: jest.fn().mockResolvedValue({}),
            constructor: jest.fn().mockResolvedValue({}),
            find: jest.fn(),
            findById: jest.fn(),
            findByIdAndUpdate: jest.fn(),
            findByIdAndDelete: jest.fn(),
            save: jest.fn(),
            exec: jest.fn(),
          },
        },
        {
          provide: getModelToken(Element.name),
          useValue: {
            new: jest.fn().mockResolvedValue({}),
            constructor: jest.fn().mockResolvedValue({}),
            save: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<WaterService>(WaterService);
    waterModel = module.get(getModelToken(Water.name));
    elementModel = module.get(getModelToken(Element.name));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create water', async () => {
    const createWaterDto = { name: 'Test Water' };
    const createdWater = { _id: '1', ...createWaterDto };
    waterModel.prototype.save.mockResolvedValue(createdWater);

    expect(await service.createWater(createWaterDto)).toEqual(createdWater);
  });

  it('should find all water', async () => {
    const waters = [{ _id: '1', name: 'Test Water' }];
    waterModel.find.mockReturnValue({
      exec: jest.fn().mockResolvedValue(waters),
    });

    expect(await service.findAll()).toEqual(waters);
  });

  it('should find one water by id', async () => {
    const water = { _id: '1', name: 'Test Water' };
    waterModel.findById.mockReturnValue({
      exec: jest.fn().mockResolvedValue(water),
    });

    expect(await service.findOne('1')).toEqual(water);
  });

  it('should update water', async () => {
    const updateWaterDto = { name: 'Updated Water' };
    const updatedWater = { _id: '1', ...updateWaterDto };
    waterModel.findByIdAndUpdate.mockReturnValue({
      exec: jest.fn().mockResolvedValue(updatedWater),
    });

    expect(await service.updateWater('1', updateWaterDto)).toEqual(
      updatedWater,
    );
  });

  it('should delete water', async () => {
    const deletedWater = { _id: '1', name: 'Test Water' };
    waterModel.findByIdAndDelete.mockReturnValue({
      exec: jest.fn().mockResolvedValue(deletedWater),
    });

    expect(await service.deleteWater('1')).toEqual(deletedWater);
  });

  it('should add element to water', async () => {
    const water = {
      _id: '1',
      elements: [],
      save: jest.fn().mockResolvedValue({}),
    };
    const createElementDto = { name: 'Test Element', concentration: 10 };
    const element = { _id: '2', ...createElementDto };
    waterModel.findById.mockResolvedValue(water);
    elementModel.prototype.save.mockResolvedValue(element);

    water.elements.push = jest.fn().mockReturnValue(element);

    expect(await service.addElement('1', createElementDto)).toEqual(water);
  });

  it('should update element in water', async () => {
    const water = {
      _id: '1',
      elements: [{ _id: '2', name: 'Test Element', concentration: 10 }],
      save: jest.fn().mockResolvedValue({}),
    };
    const updateElementDto = { concentration: 20 };
    waterModel.findById.mockResolvedValue(water);

    expect(await service.updateElement('1', '2', updateElementDto)).toEqual(
      water,
    );
  });

  it('should remove element from water', async () => {
    const water = {
      _id: '1',
      elements: [{ _id: '2', name: 'Test Element', concentration: 10 }],
      save: jest.fn().mockResolvedValue({}),
    };
    waterModel.findById.mockResolvedValue(water);

    expect(await service.removeElement('1', '2')).toEqual(water);
  });

  it('should calculate composition', async () => {
    const water = {
      _id: '1',
      elements: [{ _id: '2', name: 'Test Element', concentration: 10 }],
      save: jest.fn().mockResolvedValue({}),
    };
    const baseElement = {
      name: 'Test Element',
      symbol: 'TE',
      mMass: 100,
      forms: [{ symbol: 'TE', mMass: 50 }],
    };
    const elementBase = [baseElement];
    const elementForm = baseElement.forms[0];

    jest.spyOn(service, 'calculateComposition').mockResolvedValue(water);

    expect(await service.calculateComposition(water)).toEqual(water);
  });
});
