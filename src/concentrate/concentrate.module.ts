import { Module } from '@nestjs/common';
import { ConcentrateService } from './concentrate.service';
import { ConcentrateController } from './concentrate.controller';
import { SchemasModule } from 'src/schemas/schemas.module';
import { SharedModule } from '../shared/shared.module';
import { FertilizerController } from './fertilizer.controller';
import { FertilizerService } from './fertilizer.service';

@Module({
  imports: [SchemasModule, SharedModule],
  controllers: [ConcentrateController, FertilizerController],
  providers: [ConcentrateService, FertilizerService],
  exports: [ConcentrateService],
})
export class ConcentrateModule {}
