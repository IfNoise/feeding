import { Test, TestingModule } from '@nestjs/testing';
import { FertilizerUnitService } from './fertilizer-unit.service';

describe('FertilizerUnitService', () => {
  let service: FertilizerUnitService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FertilizerUnitService],
    }).compile();

    service = module.get<FertilizerUnitService>(FertilizerUnitService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
