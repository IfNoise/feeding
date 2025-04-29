import { Test, TestingModule } from '@nestjs/testing';
import { ConcentrateController } from './concentrate.controller';
import { ConcentrateService } from './concentrate.service';
import { CreateConcentrateDto } from './dto/create-concentrate.dto';
import { UpdateConcentrateDto } from './dto/update-concentrate.dto';
import { Concentrate } from '../schemas/concentrate.schema';

describe('ConcentrateController', () => {
  let controller: ConcentrateController;
  let service: ConcentrateService;

  // Создаем мок объекта концентрата, соответствующий схеме
  const mockConcentrate = {
    _id: '1',
    name: 'Test Concentrate',
    description: 'Test Description',
    fertilizers: [],
    content: [],
    aniones: 0,
    kationes: 0,
    solution: {},
  } as Concentrate & { _id: string };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ConcentrateController],
      providers: [
        {
          provide: ConcentrateService,
          useValue: {
            create: jest.fn(),
            findAll: jest.fn(),
            findOne: jest.fn(),
            update: jest.fn(),
            remove: jest.fn(),
            calculateConcentrateContent: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<ConcentrateController>(ConcentrateController);
    service = module.get<ConcentrateService>(ConcentrateService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create a new concentrate', async () => {
      const createConcentrateDto: CreateConcentrateDto = {
        name: 'Test Concentrate',
        description: 'Test Description',
      };
      jest.spyOn(service, 'create').mockResolvedValue(mockConcentrate);

      expect(await controller.create(createConcentrateDto)).toBe(
        mockConcentrate,
      );
      expect(service.create).toHaveBeenCalledWith(createConcentrateDto);
    });
  });

  describe('findAll', () => {
    it('should return an array of concentrates', async () => {
      const result = [
        {
          _id: '1',
          name: 'Test Concentrate 1',
          description: 'Test Description 1',
          fertilizers: [],
          content: [],
          aniones: 0,
          kationes: 0,
          solution: {},
        },
        {
          _id: '2',
          name: 'Test Concentrate 2',
          description: 'Test Description 2',
          fertilizers: [],
          content: [],
          aniones: 0,
          kationes: 0,
          solution: {},
        },
      ] as (Concentrate & { _id: string })[];
      jest.spyOn(service, 'findAll').mockResolvedValue(result);

      expect(await controller.findAll()).toBe(result);
      expect(service.findAll).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return a single concentrate', async () => {
      jest.spyOn(service, 'findOne').mockResolvedValue(mockConcentrate);

      expect(await controller.findOne('1')).toBe(mockConcentrate);
      expect(service.findOne).toHaveBeenCalledWith('1');
    });
  });

  describe('update', () => {
    it('should update a concentrate', async () => {
      const updateConcentrateDto: UpdateConcentrateDto = {
        name: 'Updated Concentrate',
        description: 'Updated Description',
        fertilizers: [],
      };
      const updatedMock = {
        ...mockConcentrate,
        name: 'Updated Concentrate',
        description: 'Updated Description',
      };
      jest.spyOn(service, 'update').mockResolvedValue(updatedMock);

      expect(await controller.update('1', updateConcentrateDto)).toBe(
        updatedMock,
      );
      expect(service.update).toHaveBeenCalledWith('1', updateConcentrateDto);
    });
  });

  describe('remove', () => {
    it('should remove a concentrate', async () => {
      jest.spyOn(service, 'remove').mockResolvedValue(mockConcentrate);

      expect(await controller.remove('1')).toBe(mockConcentrate);
      expect(service.remove).toHaveBeenCalledWith('1');
    });
  });

  describe('calculateContent', () => {
    it('should calculate concentrate content', async () => {
      // Добавляем данные после расчета элементного состава
      const calculatedResult = {
        ...mockConcentrate,
        content: [
          { element: 'N', concentration: 10 },
          { element: 'P', concentration: 5 },
          { element: 'K', concentration: 7 },
        ],
        solution: {
          elements: [
            { element: 'N', concentration: 10 },
            { element: 'P', concentration: 5 },
            { element: 'K', concentration: 7 },
          ],
          kationes: 0.012,
          aniones: 0.008,
          EC: 1.5,
        },
      };

      // Создаем мок для метода findOne, который возвращает концентрат как DocumentType
      jest.spyOn(service, 'findOne').mockResolvedValue({
        ...mockConcentrate,
        save: jest.fn().mockResolvedValue(calculatedResult),
      } as any);

      // Создаем мок для метода calculateConcentrateContent
      jest
        .spyOn(service, 'calculateConcentrateContent')
        .mockResolvedValue(calculatedResult as any);

      expect(await controller.calculateContent('1')).toBe(calculatedResult);
      expect(service.findOne).toHaveBeenCalledWith('1');
      expect(service.calculateConcentrateContent).toHaveBeenCalled();
    });
  });
});
