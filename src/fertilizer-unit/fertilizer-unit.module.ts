import { Module } from '@nestjs/common';
import { FertilizerUnitService } from './fertilizer-unit.service';
import { FertilizerUnitController } from './fertilizer-unit.controller';
import { SchemasModule } from 'src/schemas/schemas.module';

@Module({
  imports: [SchemasModule],
  controllers: [FertilizerUnitController],
  providers: [FertilizerUnitService],
})
export class FertilizerUnitModule {}
