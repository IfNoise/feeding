import { Test, TestingModule } from '@nestjs/testing';
import { ConcentrateController } from './concentrate.controller';
import { ConcentrateService } from './concentrate.service';

describe('ConcentrateController', () => {
  let controller: ConcentrateController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ConcentrateController],
      providers: [ConcentrateService],
    }).compile();

    controller = module.get<ConcentrateController>(ConcentrateController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
