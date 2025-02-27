import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { NotFoundException } from '@nestjs/common';
import { Model } from 'mongoose';
import { ElementService } from './element.service';
import { UpdateElementDto } from './dto/update-element.dto';
import { Element, ElementDocument } from 'src/schemas/element.schema';
import { Fertilizer, FertilizerDocument } from 'src/schemas/fertilizer.schema';

describe('ElementService', () => {
  let service: ElementService;
  let fertilizerModel: Model<FertilizerDocument>;
  let elementModel: Model<ElementDocument>;

  const mockFertilizer = {
    _id: 'fertilizerId',
    elements: [],
    save: jest.fn(),
  };

  const mockElement = {
    _id: 'elementId',
    name: 'Nitrogen',
    form: 'N',
    concentration: 10,
  };

  const mockFertilizerModel = {
    findById: jest.fn().mockResolvedValue(mockFertilizer),
    findOne: jest.fn().mockResolvedValue(mockFertilizer),
  };

  const mockElementModel = {
    create: jest.fn().mockResolvedValue(mockElement),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ElementService,
        {
          provide: getModelToken(Fertilizer.name),
          useValue: mockFertilizerModel,
        },
        {
          provide: getModelToken(Element.name),
          useValue: mockElementModel,
        },
      ],
    }).compile();

    service = module.get<ElementService>(ElementService);
    fertilizerModel = module.get<Model<FertilizerDocument>>(
      getModelToken(Fertilizer.name),
    );
    elementModel = module.get<Model<ElementDocument>>(
      getModelToken(Element.name),
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a new element and add it to a fertilizer', async () => {
      const createElementDto: UpdateElementDto = {
        name: 'Nitrogen',
        form: 'N',
        concentration: 10,
      };
      const result = await service.create('fertilizerId', createElementDto);
      expect(result).toEqual(mockElement);
      expect(mockFertilizer.elements).toContain(mockElement);
      expect(mockFertilizer.save).toHaveBeenCalled();
    });

    it('should throw NotFoundException if fertilizer is not found', async () => {
      jest.spyOn(fertilizerModel, 'findById').mockResolvedValueOnce(null);
      await expect(
        service.create('invalidId', {} as UpdateElementDto),
      ).rejects.toThrow(NotFoundException);
    });
  });

  describe('findOne', () => {
    it('should find an element in a fertilizer', async () => {
      mockFertilizer.elements.push(mockElement);
      const result = await service.findOne('fertilizerId', 'elementId');
      expect(result).toEqual(mockElement);
    });

    it('should throw NotFoundException if fertilizer is not found', async () => {
      jest.spyOn(fertilizerModel, 'findById').mockResolvedValueOnce(null);
      await expect(service.findOne('invalidId', 'elementId')).rejects.toThrow(
        NotFoundException,
      );
    });

    it('should throw NotFoundException if element is not found', async () => {
      await expect(
        service.findOne('fertilizerId', 'invalidElementId'),
      ).rejects.toThrow(NotFoundException);
    });
  });

  describe('update', () => {
    it('should update an element in a fertilizer', async () => {
      mockFertilizer.elements.push(mockElement);
      const updateElementDto: UpdateElementDto = { concentration: 20 };
      const result = await service.update(
        'fertilizerId',
        'elementId',
        updateElementDto,
      );
      expect(result.concentration).toEqual(20);
      expect(mockFertilizer.save).toHaveBeenCalled();
    });

    it('should throw NotFoundException if fertilizer is not found', async () => {
      jest.spyOn(fertilizerModel, 'findOne').mockResolvedValueOnce(null);
      await expect(
        service.update('invalidId', 'elementId', {} as UpdateElementDto),
      ).rejects.toThrow(NotFoundException);
    });

    it('should throw NotFoundException if element is not found', async () => {
      await expect(
        service.update(
          'fertilizerId',
          'invalidElementId',
          {} as UpdateElementDto,
        ),
      ).rejects.toThrow(NotFoundException);
    });
  });

  describe('remove', () => {
    it('should remove an element from a fertilizer', async () => {
      mockFertilizer.elements.push(mockElement);
      const result = await service.remove('fertilizerId', 'elementId');
      expect(result).toEqual(mockElement);
      expect(mockFertilizer.elements).not.toContain(mockElement);
      expect(mockFertilizer.save).toHaveBeenCalled();
    });

    it('should throw NotFoundException if fertilizer is not found', async () => {
      jest.spyOn(fertilizerModel, 'findById').mockResolvedValueOnce(null);
      await expect(service.remove('invalidId', 'elementId')).rejects.toThrow(
        NotFoundException,
      );
    });

    it('should throw NotFoundException if element is not found', async () => {
      await expect(
        service.remove('fertilizerId', 'invalidElementId'),
      ).rejects.toThrow(NotFoundException);
    });
  });
});
