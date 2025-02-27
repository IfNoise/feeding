import { Test, TestingModule } from '@nestjs/testing';
import { ConcentrateController } from './concentrate.controller';
import { ConcentrateService } from './concentrate.service';
import { CreateConcentrateDto } from './dto/create-concentrate.dto';
import { UpdateConcentrateDto } from './dto/update-concentrate.dto';

describe('ConcentrateController', () => {
  let controller: ConcentrateController;
  let service: ConcentrateService;

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
        /* fill with appropriate properties */
      };
      const result = {
        /* expected result */
      };
      jest.spyOn(service, 'create').mockResolvedValue(result);

      expect(await controller.create(createConcentrateDto)).toBe(result);
    });
  });

  describe('findAll', () => {
    it('should return an array of concentrates', async () => {
      const result = [
        /* expected result */
      ];
      jest.spyOn(service, 'findAll').mockResolvedValue(result);

      expect(await controller.findAll()).toBe(result);
    });
  });

  describe('findOne', () => {
    it('should return a single concentrate', async () => {
      const result = {
        /* expected result */
      };
      jest.spyOn(service, 'findOne').mockResolvedValue(result);

      expect(await controller.findOne('1')).toBe(result);
    });
  });

  describe('update', () => {
    it('should update a concentrate', async () => {
      const updateConcentrateDto: UpdateConcentrateDto = {
        /* fill with appropriate properties */
      };
      const result = {
        /* expected result */
      };
      jest.spyOn(service, 'update').mockResolvedValue(result);

      expect(await controller.update('1', updateConcentrateDto)).toBe(result);
    });
  });

  describe('remove', () => {
    it('should remove a concentrate', async () => {
      const result = {
        /* expected result */
      };
      jest.spyOn(service, 'remove').mockResolvedValue(result);

      expect(await controller.remove('1')).toBe(result);
    });
  });
});
