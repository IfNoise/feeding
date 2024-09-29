import { Test, TestingModule } from '@nestjs/testing';
import { FertilizerController } from './fertilizer.controller';
import { FertilizerService } from './fertilizer.service';

describe('FertilizerController', () => {
  let controller: FertilizerController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FertilizerController],
      providers: [FertilizerService],
    }).compile();

    controller = module.get<FertilizerController>(FertilizerController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
