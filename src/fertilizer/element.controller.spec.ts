import { Test, TestingModule } from '@nestjs/testing';
import { ElementController } from './element.controller';
import { ElementService } from './element.service';
import { UpdateElementDto } from './dto/update-element.dto';
import { Element } from 'src/schemas/element.schema';

describe('ElementController', () => {
  let controller: ElementController;
  let service: ElementService;

  const mockElementService = {
    create: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ElementController],
      providers: [
        {
          provide: ElementService,
          useValue: mockElementService,
        },
      ],
    }).compile();

    controller = module.get<ElementController>(ElementController);
    service = module.get<ElementService>(ElementService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create a new element', async () => {
      const fertilizerId = '1';
      const createElementDto: UpdateElementDto = { name: 'Nitrogen' };
      const result: Element = { id: '1', name: 'Nitrogen' };

      jest.spyOn(service, 'create').mockResolvedValue(result);

      expect(await controller.create(fertilizerId, createElementDto)).toBe(
        result,
      );
      expect(service.create).toHaveBeenCalledWith(
        fertilizerId,
        createElementDto,
      );
    });
  });

  describe('findOne', () => {
    it('should return an element', async () => {
      const fertilizerId = '1';
      const elementId = '1';
      const result: Element = { id: '1', name: 'Nitrogen' };

      jest.spyOn(service, 'findOne').mockResolvedValue(result);

      expect(await controller.findOne(fertilizerId, elementId)).toBe(result);
      expect(service.findOne).toHaveBeenCalledWith(fertilizerId, elementId);
    });
  });

  describe('update', () => {
    it('should update an element', async () => {
      const fertilizerId = '1';
      const elementId = '1';
      const updateElementDto: UpdateElementDto = { name: 'Phosphorus' };
      const result: Element = { id: '1', name: 'Phosphorus' };

      jest.spyOn(service, 'update').mockResolvedValue(result);

      expect(
        await controller.update(fertilizerId, elementId, updateElementDto),
      ).toBe(result);
      expect(service.update).toHaveBeenCalledWith(
        fertilizerId,
        elementId,
        updateElementDto,
      );
    });
  });

  describe('remove', () => {
    it('should delete an element', async () => {
      const fertilizerId = '1';
      const elementId = '1';
      const result: Element = { id: '1', name: 'Nitrogen' };

      jest.spyOn(service, 'remove').mockResolvedValue(result);

      expect(await controller.remove(fertilizerId, elementId)).toBe(result);
      expect(service.remove).toHaveBeenCalledWith(fertilizerId, elementId);
    });
  });
});
