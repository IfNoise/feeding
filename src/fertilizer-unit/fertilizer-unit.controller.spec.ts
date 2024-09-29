import { Test, TestingModule } from '@nestjs/testing';
import { FertilizerUnitController } from './fertilizer-unit.controller';
import { FertilizerUnitService } from './fertilizer-unit.service';

describe('FertilizerUnitController', () => {
  let controller: FertilizerUnitController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FertilizerUnitController],
      providers: [FertilizerUnitService],
    }).compile();

    controller = module.get<FertilizerUnitController>(FertilizerUnitController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
