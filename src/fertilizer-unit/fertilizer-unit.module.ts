import { Module } from '@nestjs/common';
import { FertilizerUnitService } from './fertilizer-unit.service';
import { FertilizerUnitController } from './fertilizer-unit.controller';
import { SchemasModule } from 'src/schemas/schemas.module';
import { PumpController } from './pump.controller';
import { PumpService } from './pump.service';

@Module({
  imports: [SchemasModule],
  controllers: [FertilizerUnitController, PumpController],
  providers: [FertilizerUnitService, PumpService],
})
export class FertilizerUnitModule {}
